import os
import uuid

from fastapi.params import Header, File
from starlette.templating import Jinja2Templates
from web3 import Web3

from backend.contractsApi.PropertyNFTAPI import PropertyNFTAPI
from backend.db.db import get_db, get_user, get_user_by_id, DATABASE_URL
# from backend.contractsApi.PropertyNFTAPI import PropertyNFTAPI
import backend.settings
from fastapi import APIRouter, Depends, HTTPException, status, Request, Form, UploadFile
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
from asyncpg import Connection


# Dependency to ensure user is admin
from backend.db.db_client import DBClient

DB_C = DBClient(DATABASE_URL)


async def check_admin(
    request: Request,
    conn: Connection = Depends(get_db)
):
    """
    Перевіряє, чи має користувач роль 'admin'.
    Вимагає заголовок X-User-Email.
    """
    try:
        user = await get_user_by_id(conn, request.session["user_id"])
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        if user.role != 'admin':
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Not enough privileges"
            )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e))

router = APIRouter(prefix="/nfts", tags=["nfts"], dependencies=[Depends(check_admin)])


# Pydantic model for minting a new NFT
class NFTMintRequest(BaseModel):
    to: str = Field(..., description="Address to mint the NFT to")
    token_uri: str = Field(..., description="Metadata URI for the NFT")
    royalty_receiver: str = Field(..., description="Address to receive royalties")
    royalty_fee_bp: int = Field(..., ge=0, le=10000, description="Royalty fee in basis points (out of 10000)")


# Directory to save uploaded images
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

templates = Jinja2Templates(directory="./frontend")

@router.get("/mint", response_class=HTMLResponse)
async def mint_form(request: Request):
    """
    Render HTML form to mint a new NFT, with drag-and-drop image upload.
    HTML is moved into templates/mint.html
    """
    return templates.TemplateResponse(
        "mint.html",
        {"request": request, "action_url": request.url.path}
    )

@router.post("/mint", status_code=201)
async def mint_nft(
    to: str = Form(...),
    token_uri: str = Form(...),
    royalty_receiver: str = Form(...),
    royalty_fee_bp: int = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    country: str = Form(...),
    area: str = Form(...),
    bedrooms: str = Form(...),
    bathrooms: str = Form(...),
    listing_type: str = Form(...),
    price: int = Form(...),
    currency: str = Form(...),
    image_file: UploadFile = File(...),
    conn: Connection = Depends(get_db)
):
    """
    Endpoint to mint a new NFT using the PropertyNFT contract via form data.
    Saves uploaded image and passes its path into DB and contract.
    """
    # Save uploaded image
    filename = f"{uuid.uuid4().hex}_{image_file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as f:
        f.write(await image_file.read())

    # Initialize Web3 provider
    w3 = Web3(Web3.HTTPProvider(backend.settings.INFURA_URL))
    if not w3.isConnected():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Cannot connect to Ethereum node"
        )

    # Instantiate PropertyNFTAPI
    prop_api = PropertyNFTAPI(
        web3=w3,
        contract_address=backend.settings.PROPERTY_ADDRESS,
        abi=backend.settings.PROPERTY_ABI,
        account_address=backend.settings.DEPLOYER_PUBLIC,
        private_key=backend.settings.DEPLOYER_PRIVATE_KEY
    )

    # Mint the NFT
    try:
        result = prop_api.mint_property(
            to=to,
            token_uri=token_uri,
            royalty_receiver=royalty_receiver,
            royalty_fee_bp=royalty_fee_bp
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Minting failed: {e}"
        )

    # Extract transaction hash and token_id
    tx_hash = result['receipt'].transactionHash.hex()
    token_id = result.get('token_id') or result.get('toke_id')

    # Insert property including image path
    DB_C.insert_property(
        {
            "address": tx_hash,
            "token_id": token_id,
            "image": file_path,
            "title": title,
            "description": description,
            "location": location,
            "country": country,
            "area": area,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "property": title,
            "listing_type": listing_type,
            "price": price,
            "currency": currency
        }
    )
    return {
        "status": "success",
        "tx_hash": tx_hash,
        "token_id": token_id,
        "image_path": file_path
    }

def get_property_nft_api():
    from web3 import Web3
    from backend.contractsApi.PropertyNFTAPI import PropertyNFTAPI

    w3 = Web3(Web3.HTTPProvider(backend.settings.INFURA_URL))
    if not w3.isConnected():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Cannot connect to Ethereum node"
        )

    return PropertyNFTAPI(
        web3=w3,
        contract_address=backend.settings.PROPERTY_ADDRESS,
        abi=backend.settings.PROPERTY_ABI,
        account_address=backend.settings.DEPLOYER_PUBLIC,
        private_key=backend.settings.DEPLOYER_PRIVATE_KEY
    )


@router.get("/approve", response_class=HTMLResponse)
async def approve_form(request: Request):
    """
    Render HTML form to approve an operator for an NFT.
    """
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head><title>Approve NFT</title></head>
    <body>
      <h1>Approve Operator for NFT</h1>
      <form action="{request.url.path}" method="post">
        <label>Operator Address: <input name="operator" type="text" required /></label><br/>
        <label>Token ID: <input name="token_id" type="number" required /></label><br/>
        <button type="submit">Approve</button>
      </form>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)


@router.post("/approve")
async def approve_nft(
    operator: str = Form(...),
    token_id: int = Form(...),
):
    prop_api = get_property_nft_api()
    try:
        result = prop_api.approve(operator, token_id)
        return {"status": "success", "tx_hash": result["receipt"].transactionHash.hex()}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/token-uri/{token_id}")
async def get_token_uri(token_id: int):
    prop_api = get_property_nft_api()
    try:
        uri = prop_api.token_uri(token_id)
        return {"token_id": token_id, "token_uri": uri}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/owner-of/{token_id}")
async def get_owner_of(token_id: int):
    prop_api = get_property_nft_api()
    try:
        owner = prop_api.owner_of(token_id)
        return {"token_id": token_id, "owner": owner}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/supports-interface/{interface_id}")
async def check_interface_support(interface_id: str):
    prop_api = get_property_nft_api()
    try:
        supported = prop_api.supports_interface(interface_id)
        return {"interface_id": interface_id, "supported": supported}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/royalty-info")
async def get_royalty_info(
    token_id: int,
    sale_price: int
):
    prop_api = get_property_nft_api()
    try:
        info = prop_api.royalty_info(token_id, sale_price)
        return {"token_id": token_id, "sale_price": sale_price, **info}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
