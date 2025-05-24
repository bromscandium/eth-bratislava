from datetime import datetime, date
from typing import Optional, List, Dict, Any

from fastapi import APIRouter, Depends, HTTPException, status, Request, Form, Query
from pydantic import BaseModel, Field
from asyncpg import Connection
from starlette.responses import HTMLResponse, JSONResponse
from starlette.templating import Jinja2Templates
from web3 import Web3

from backend.db import db_client
from backend.db.db import get_db, get_user_by_id, DATABASE_URL
from backend.settings import INFURA_URL, MARKETPLACE_ADDRESS, MARKETPLACE_ABI, STABLECOIN_ADDRESS, ERC20_ABI, DEPLOYER_PUBLIC, DEPLOYER_PRIVATE_KEY
from backend.contractsApi.MarketplaceAPI import MarketplaceAPI

DB_C = db_client.DBClient(DATABASE_URL)
# Dependency to ensure user is admin
async def check_admin(
    request: Request,
    conn: Connection = Depends(get_db)
):
    """
    Перевіряє, чи має користувач роль 'admin'.
    Вимагає, щоб сесія містила 'user_id'.
    """
    try:
        user = await get_user_by_id(conn, request.session.get("user_id"))
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        if user.role != 'admin':
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough privileges"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

# Dependency to ensure user is authenticated (any role)
async def get_current_user(
    request: Request,
    conn: Connection = Depends(get_db)
):
    """
    Перевіряє, чи залогінений користувач.
    Вимагає, щоб сесія містила 'user_id'.
    """
    try:
        user = await get_user_by_id(conn, request.session.get("user_id"))
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not authenticated"
            )
        return user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
templates = Jinja2Templates(directory="./frontend")

router = APIRouter(
    prefix="/marketplace",
    tags=["marketplace"]
)

def get_marketplace_api():
    """
    Ініціалізує Web3 та повертає екземпляр MarketplaceAPI.
    """
    w3 = Web3(Web3.HTTPProvider(INFURA_URL))
    if not w3.isConnected():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Cannot connect to Ethereum node"
        )
    return MarketplaceAPI(
        web3=w3,
        contract_address=MARKETPLACE_ADDRESS,
        abi=MARKETPLACE_ABI,
        stablecoin_address=STABLECOIN_ADDRESS,
        erc20_abi=ERC20_ABI,
        account_address=DEPLOYER_PUBLIC,
        private_key=DEPLOYER_PRIVATE_KEY
    )


# -------- Pydantic models --------

class KYCRequest(BaseModel):
    user_address: str = Field(..., description="Адреса користувача для KYC")
    approved: bool = Field(..., description="Чи схвалено користувача (true/false)")

class ListItemRequest(BaseModel):
    token_contract: str = Field(..., description="Адреса контракту токена")
    token_id: int = Field(..., description="ID токена для продажу")
    price: int = Field(..., description="Ціна у стейблкойнах (в найменших одиницях)")

class BuyItemRequest(BaseModel):
    token_contract: str = Field(..., description="Адреса контракту токена")
    token_id: int = Field(..., description="ID токена для купівлі")

class CreateAuctionRequest(BaseModel):
    token_contract: str = Field(..., description="Адреса контракту токена")
    token_id: int = Field(..., description="ID токена для аукціону")
    reserve_price: int = Field(..., description="Резервна ціна (в найменших одиницях)")
    start_time: int = Field(..., description="Unix-час початку аукціону (в секундах)")
    end_time: int = Field(..., description="Unix-час завершення аукціону (в секундах)")

class PlaceBidRequest(BaseModel):
    token_contract: str = Field(..., description="Адреса контракту токена")
    token_id: int = Field(..., description="ID токена для ставлення")
    amount: int = Field(..., description="Сума ставки (в найменших одиницях)")

class SettleAuctionRequest(BaseModel):
    token_contract: str = Field(..., description="Адреса контракту токена")
    token_id: int = Field(..., description="ID токена для завершення аукціону")

class ApproveStableRequest(BaseModel):
    spender: str = Field(..., description="Адреса того, хто витратить стейблкойни")
    amount: int = Field(..., description="Сума, яку можна списувати (в найменших одиницях)")

class TransferStableRequest(BaseModel):
    to: str = Field(..., description="Адреса отримувача")
    amount: int = Field(..., description="Сума для переказу (в найменших одиницях)")


@router.get("/kyc", response_class=HTMLResponse)
async def set_kyc_form(request: Request):
    html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Set KYC</title>
        </head>
        <body>
            <h1>Установить KYC</h1>
            <form action="/marketplace/kyc" method="post">
                <div>
                    <label for="user_address">User Address:</label>
                    <input type="text" id="user_address" name="user_address" required />
                </div>
                <div>
                    <label for="approved">Approved:</label>
                    <input type="checkbox" id="approved" name="approved" value="true" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>

        """
    return HTMLResponse(content=html_content)

@router.post("/kyc", dependencies=[Depends(check_admin)])
async def set_kyc(
    user_address: str = Form(...),
    approved: bool = Form(False)
):
    """
    Адмін може встановити статус KYC для користувача.
    Updates blockchain and sets the KYC flag in the members table.
    """
    api = get_marketplace_api()
    try:
        tx = api.set_kyc(user_address, approved)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"setKYC failed: {e}"
        )

    # After successful blockchain transaction, update DB
    # Find member by wallet address
    member = DB_C._execute(
        "SELECT id FROM members WHERE wallet = %s;",
        (user_address,),
        fetch=True
    )
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Member with given wallet not found"
        )
    member_id = member[0]['id']
    # Update the "kyc" column (ensure this column exists!)
    DB_C.update_member(member_id, {"kyc": approved})

    return {
        "status": "success",
        "tx_hash": tx["receipt"].transactionHash.hex(),
        "member_id": member_id,
        "kyc": approved
    }


# -------- List Item Endpoints (combined) --------
@router.get("/list-item")
async def list_item(
    request: Request,
    token_contract: Optional[str] = Query(None),
    token_id: Optional[int] = Query(None),
    user=Depends(get_current_user)
):
    """
    - With no query params: render HTML form for listing an item.
    - With token_contract & token_id: return JSON list of matching properties.
    """
    if token_contract is None or token_id is None:
        # Render HTML form
        return templates.TemplateResponse("list_item.html", {"request": request, "action_url": request.url.path})

    # Query DB
    rows = DB_C._execute(
        "SELECT * FROM property WHERE address = %s AND token_id = %s;",
        (token_contract, token_id),
        fetch=True
    ) or []

    # Serialize datetime objects
    serialized: List[Dict[str, Any]] = []
    for row in rows:
        item: Dict[str, Any] = {}
        for key, value in row.items():
            if isinstance(value, (datetime, date)):
                item[key] = value.isoformat()
            else:
                item[key] = value
        serialized.append(item)

    return JSONResponse(content=serialized)

@router.post("/list-item", status_code=201)
async def list_item_post(
    token_contract: str = Form(...),
    token_id: int = Form(...),
    price: int = Form(...),
    user=Depends(get_current_user)
):
    api = get_marketplace_api()
    try:
        tx = api.list_item(token_contract, token_id, price)
    except Exception as e:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail=f"listItem failed: {e}")

    tx_hash = tx['receipt'].transactionHash.hex()
    # After successful listing, update the property's address in DB
    # Find the property record
    props = DB_C._execute(
        "SELECT id FROM property WHERE token_id = %s;",
        (token_id,), True
    )
    if props:
        prop_id = props[0]['id']
        # Update its address to the token_contract (marketplace address)
        DB_C.update_property(prop_id, {"address": token_contract})
    else:
        # Optionally handle missing record
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Property not found in database")

    return {"status": "success", "tx_hash": tx_hash, "updated_property_id": prop_id}


# -------- Buy Item Endpoint (new) --------
@router.post("/buy-item", status_code=201)
async def buy_item(
    request: BuyItemRequest,
    user=Depends(get_current_user)
):
    api = get_marketplace_api()
    try:
        tx = api.buy_item(request.token_contract, request.token_id)
    except Exception as e:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail=f"buyItem failed: {e}")

    tx_hash = tx['receipt'].transactionHash.hex()
    # After successful purchase, update property's address to new owner
    # Find property by token_id
    props = DB_C._execute(
        "SELECT id FROM property WHERE token_id = %s;",
        (request.token_id,),
        fetch=True
    )
    if not props:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Property not found in database")
    prop_id = props[0]['id']
    # Assume user.wallet holds buyer's address
    buyer_address = getattr(user, 'wallet', None)
    if not buyer_address:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to retrieve buyer wallet address")
    DB_C.update_property(prop_id, {"address": buyer_address})

    return {"status": "success", "tx_hash": tx_hash, "updated_property_id": prop_id}

@router.get("/create-auction", response_class=HTMLResponse)
async def create_auction_form(request: Request, user=Depends(get_current_user)):
    """
    Render HTML form to create a timed auction.
    """
    return templates.TemplateResponse("create_auction.html", {
        "request": request,
        "action_url": request.url.path,
        "marketplace_address": MARKETPLACE_ADDRESS,
        "marketplace_abi": MARKETPLACE_ABI,
        "rpc_url": INFURA_URL
    })


@router.post("/create-auction", status_code=201)
async def create_timed_auction(
    token_contract: str = Form(...),
    token_id: int       = Form(...),
    reserve_price: int  = Form(...),
    start_time: int     = Form(...),
    end_time: int       = Form(...),
    tx_hash: str        = Form(...),
    user=Depends(get_current_user)
):
    """
    Persist a MetaMask-signed auction into the DB.
    """
    # Ensure creator_id is a plain Python UUID or string
    raw_id = getattr(user, 'id', None)
    if raw_id is None:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="User ID missing")

    # Convert to string (psycopg2 can adapt str -> UUID column)
    creator_id = str(raw_id)

    auction_data = {
        "id_creator":   creator_id,
        "id_lastbuyer": None,
        "ended_at":     datetime.utcfromtimestamp(end_time),
        "first_bid":    reserve_price,
        "last_bid":     None,
        "address":      token_contract,
        "token_id":     token_id
    }
    DB_C.insert_auction(auction_data)

    return {"status": "success", "tx_hash": tx_hash}

@router.post("/place-bid")
async def place_bid(
    request: PlaceBidRequest,
    user=Depends(get_current_user)
):
    """
    Розміщення ставки на аукціон.
    Користувач має бути залогінений.
    """
    api = get_marketplace_api()
    try:
        tx = api.place_bid(
            request.token_contract,
            request.token_id,
            request.amount
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"placeBid failed: {e}"
        )
    return {
        "status": "success",
        "tx_hash": tx["receipt"].transactionHash.hex()
    }

@router.post("/settle-auction")
async def settle_auction(
    request: SettleAuctionRequest,
    user=Depends(get_current_user)
):
    """
    Завершення аукціону.
    Користувач має бути залогінений.
    """
    api = get_marketplace_api()
    try:
        tx = api.settle_auction(
            request.token_contract,
            request.token_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"settleAuction failed: {e}"
        )
    return {
        "status": "success",
        "tx_hash": tx["receipt"].transactionHash.hex()
    }

@router.post("/approve-stable")
async def approve_stable(
    request: ApproveStableRequest,
    user=Depends(get_current_user)
):
    """
    Схвалення витрати стейблкойнів контрактом маркетплейсу.
    Користувач має бути залогінений.
    """
    api = get_marketplace_api()
    try:
        tx = api.approve_stable(
            request.spender,
            request.amount
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"approveStable failed: {e}"
        )
    return {
        "status": "success",
        "tx_hash": tx["receipt"].transactionHash.hex()
    }

@router.post("/transfer-stable")
async def transfer_stable(
    request: TransferStableRequest,
    user=Depends(get_current_user)
):
    """
    Переказ стейблкойнів іншому користувачу.
    Користувач має бути залогінений.
    """
    api = get_marketplace_api()
    try:
        tx = api.transfer_stable(
            request.to,
            request.amount
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"transferStable failed: {e}"
        )
    return {
        "status": "success",
        "tx_hash": tx["receipt"].transactionHash.hex()
    }


# -------- Read-only endpoints --------

@router.get("/listing/{token_contract}/{token_id}")
async def get_listing(token_contract: str, token_id: int):
    """
    Повертає інформацію про лістинг (seller, price, active).
    """
    api = get_marketplace_api()
    try:
        listing = api.get_listing(token_contract, token_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"getListing failed: {e}"
        )
    return {
        "token_contract": token_contract,
        "token_id": token_id,
        "listing": {
            "seller": listing[0],
            "price": listing[1],
            "active": listing[2]
        }
    }

@router.get("/auction/{token_contract}/{token_id}")
async def get_auction(token_contract: str, token_id: int):
    """
    Повертає інформацію про аукціон:
    (seller, reservePrice, highestBid, highestBidder, startTime, endTime, settled).
    """
    api = get_marketplace_api()
    try:
        auction = api.get_auction(token_contract, token_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"getAuction failed: {e}"
        )
    return {
        "token_contract": token_contract,
        "token_id": token_id,
        "auction": {
            "seller": auction[0],
            "reserve_price": auction[1],
            "highest_bid": auction[2],
            "highest_bidder": auction[3],
            "start_time": auction[4],
            "end_time": auction[5],
            "settled": auction[6]
        }
    }

@router.get("/fee")
async def get_marketplace_fee():
    """
    Повертає поточний розмір комісії маркетплейсу (basis points).
    """
    api = get_marketplace_api()
    try:
        fee_bp = api.get_marketplace_fee()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"getMarketplaceFee failed: {e}"
        )
    return {"marketplace_fee_bp": fee_bp}

@router.get("/anti-sniping")
async def get_anti_sniping():
    """
    Повертає час анти-снайпінгу (у секундах).
    """
    api = get_marketplace_api()
    try:
        anti_time = api.get_anti_sniping()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"getAntiSniping failed: {e}"
        )
    return {"anti_sniping_time_seconds": anti_time}
