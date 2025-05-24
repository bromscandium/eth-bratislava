
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    wallet TEXT,  
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

CREATE TABLE IF NOT EXISTS property (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address TEXT NOT NULL,
    token_id INT NULL,
    image TEXT,
    title TEXT,
    description TEXT,
    location TEXT,
    country TEXT,
    area TEXT,
    bedrooms TEXT,
    bathrooms TEXT,
    property TEXT,
    listing_type TEXT,
    price INT NULL,
    currency TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS auction (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_creator UUID REFERENCES members(id) ON DELETE SET NULL,
    id_lastbuyer UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NOT NULL,
    first_bid NUMERIC NOT NULL,
    last_bid NUMERIC,
    address TEXT NOT NULL,
    token_id INT NOT NULL
);



CREATE TABLE IF NOT EXISTS transaction (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
