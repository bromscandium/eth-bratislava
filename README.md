# dEST – Decentralized Real‑Estate Tokenization Platform

> **One‑click ownership of global property using NFTs & smart contracts**

---

## Problem & Solution

Traditional real‑estate transactions are **slow, expensive and opaque**.  Buyers and sellers must rely on layers of intermediaries—realtors, notaries, escrow agents—while paying 5‑8 % in fees and waiting weeks (or months) for ownership transfers.

### Our Answer – **dEST**

| # | What dEST delivers                                                                       |
| - | ---------------------------------------------------------------------------------------- |
| 1 | **Buy & sell real‑estate using NFTs** that represent full ownership or fractional shares |
| 2 | **100 % digital**—no realtor, broker or notary required                                  |
| 3 | **Instant ownership transfer** via self‑executing smart contracts                        |
| 4 | **Flat 0.5 % platform fee** (⇣ >90 % vs traditional 5 %+)                                |
| 5 | **Private, yet transparent**—pseudonymous on‑chain identity                              |
| 6 | **Tradable assets**—your dEST NFTs can be auctioned, traded or used as DeFi collateral   |

---

## Key Features

* **Wallet On‑Boarding** – Connect MetaMask.
* **Global Marketplace** – Filter by country, price, sale type (trade / auction).
* **Real‑time Auctions** – On‑chain bids, live countdown, history & anti‑sniping.
* **One‑click Listing Form** – Upload property data and list.
* **Interactive Maps** – MapLibre‑GL visualisation of exact coordinates.
* **Profile Dashboard** – Portfolio value, owned properties, active listings.

---

## Project Structure

```
├── contracts/            # Solidity sources
│   └── ...
├── frontend/             # React application (src/ components/ data/)
│   └── ...
├── backend/              # FastAPI service (app/) – REST & WebSocket
│   └── main.py
└── README.md
```

---

## Getting Started

### Prerequisites

* **Node.js ≥ 18**
* **Python ≥ 3.10**
* **PostgreSQL 14+**
* Git & Make

### 1 – Clone the repo

```bash
git clone https://github.com/bromscandium/eth-bratislava.git && cd eth-bratislava
```

### 2 – Frontend

```bash
cd frontend
npm install           # install dependencies
npm run start         # dev server http://localhost:3000
```

### 3 – Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # Swagger at /docs
```