from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
import asyncpg
import os
import json
from uuid import UUID
from passlib.context import CryptContext

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@84.32.59.3:5432/dEST")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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


async def get_db():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()


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
    role: str


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
            role=user_record["role"],
            created_at=user_record["created_at"],
            updated_at=user_record["updated_at"]
        )
    return None


async def get_user_by_id(conn, id: int):
    user_record = await conn.fetchrow("SELECT * FROM members WHERE id = $1", id)
    if user_record:
        return UserInDB(
            id=user_record["id"],
            email=user_record["email"],
            first_name=user_record["first_name"],
            last_name=user_record["last_name"],
            hashed_password=user_record["password"],
            role=user_record["role"],
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

