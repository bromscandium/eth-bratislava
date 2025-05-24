from fastapi import FastAPI, Depends, HTTPException, status, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
import asyncpg
from starlette.middleware.sessions import SessionMiddleware
import os
import json
from uuid import UUID
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

from backend import nft, market
from backend.db.db import get_db, init_db, get_user, get_password_hash, json_serialize, authenticate_user, DATABASE_URL
from backend.db.db_client import DBClient

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    SessionMiddleware,
    secret_key="asdfahdjfhjKJSHDFJHGSKDJHFGbwhjefqjhwdkhjfasdhfb",
    session_cookie="session"
)

app.include_router(nft.router)
app.include_router(market.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="./frontend")


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
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    conn: asyncpg.Connection = Depends(get_db)
):
    try:
        user = await get_user(conn, email)
        if user:
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

        user = await get_user(conn, email)
        response_data = {
            "status": "success",
            "redirect": "/login",
            "user": dict(new_user)
        }
        response = JSONResponse(content=json_serialize(response_data))
        request.session["user_id"] = str(user.id)
        return response

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
        request.session["user_id"] = str(user.id)
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