from fastapi import FastAPI, Depends, HTTPException, status, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
import asyncpg
import os
import json
from uuid import UUID
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@84.32.59.3:5432/dEST")


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)


def json_serialize(data):
    return json.loads(json.dumps(data, cls=CustomJSONEncoder))


class UserBase(BaseModel):
    email: EmailStr
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserInDB(UserBase):
    id: UUID
    hashed_password: str
    created_at: datetime
    updated_at: datetime

async def get_db():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    return pwd_context.hash(password)


async def get_user(conn, email: str):
    user_record = await conn.fetchrow("SELECT * FROM members WHERE email = $1", email)
    if user_record:
        return UserInDB(
            id=user_record["id"],
            email=user_record["email"],
            first_name=user_record["first_name"],
            last_name=user_record["last_name"],
            hashed_password=user_record["password"],
            created_at=user_record["created_at"],
            updated_at=user_record["updated_at"]
        )
    return None


async def authenticate_user(conn, email: str, password: str):
    user = await get_user(conn, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


async def init_db():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        await conn.execute("""
                           CREATE TABLE IF NOT EXISTS members
                           (
                               id
                               UUID
                               PRIMARY
                               KEY
                               DEFAULT
                               gen_random_uuid
                           (
                           ),
                               first_name VARCHAR
                           (
                               50
                           ) NOT NULL,
                               last_name VARCHAR
                           (
                               50
                           ) NOT NULL,
                               email VARCHAR
                           (
                               255
                           ) UNIQUE NOT NULL,
                               password VARCHAR
                           (
                               255
                           ) NOT NULL,
                               created_at TIMESTAMP NOT NULL DEFAULT NOW
                           (
                           ),
                               updated_at TIMESTAMP NOT NULL DEFAULT NOW
                           (
                           )
                               );
                           CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
                           """)
    except Exception as e:
        print(f"Error creating database tables: {e}")
    finally:
        await conn.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="../frontend")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


@app.get("/register", response_class=HTMLResponse)
async def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


@app.get("/home", response_class=HTMLResponse)
async def home_page(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


@app.post("/api/auth/register")
async def register(
        first_name: str = Form(...),
        last_name: str = Form(...),
        email: str = Form(...),
        password: str = Form(...),
        conn: asyncpg.Connection = Depends(get_db)
):
    try:
        if await get_user(conn, email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        hashed_password = get_password_hash(password)
        now = datetime.utcnow()

        new_user = await conn.fetchrow(
            """
            INSERT INTO members (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email, created_at
            """,
            first_name, last_name, email, hashed_password
        )

        response_data = {
            "status": "success",
            "redirect": "/login",
            "user": dict(new_user)
        }

        return JSONResponse(content=json_serialize(response_data))

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e))


@app.post("/api/auth/login")
async def login(
        request: Request,
        email: str = Form(...),
        password: str = Form(...),
        conn: asyncpg.Connection = Depends(get_db)
):
    try:
        user = await authenticate_user(conn, email, password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        response_data = {
            "status": "success",
            "redirect": "/home",
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }

        return JSONResponse(content=json_serialize(response_data))

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e))


@app.get("/api/users/me")
async def read_users_me(
        email: str,
        conn: asyncpg.Connection = Depends(get_db)
):
    try:
        user = await get_user(conn, email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        response_data = {
            "status": "success",
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "created_at": user.created_at
            }
        }

        return JSONResponse(content=json_serialize(response_data))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e))