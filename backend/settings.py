from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv()

# -=-=-=-=-=-=- INNIT ALL VARIABLES =-=-=-=-=-=-=
# Configuration
INFURA_URL = "https://sepolia.infura.io/v3/3428c9460e2846849a73316b2287bd78"
DEPLOYER_PUBLIC = "0x959f04B257AF18dDac43dbeFfD90bA5EDB3C9601"
DEPLOYER_PRIVATE_KEY = "5a3359380f3512735c9f117b4b35232805baa146e4ead8835072cda9554b1347"
STABLECOIN_ADDRESS = "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238"

# Contract addresses
PROPERTY_ADDRESS = Web3.toChecksumAddress("0x766E0d3A4052302900356AC396b4d6b7c0621bAF")
MARKETPLACE_ADDRESS = Web3.toChecksumAddress("0x862C9a6137035a06562b8d6e29F41627b0165CfA")

# Load ABIs
import json
with open("./backend/abi/PropertyNFT.abi.json") as f:
    PROPERTY_ABI = json.load(f)
with open("./backend/abi/Marketplace.abi.json") as f:
    MARKETPLACE_ABI = json.load(f)
with open("./backend/abi/ERC20.abi.json") as f:
    ERC20_ABI = json.load(f)
