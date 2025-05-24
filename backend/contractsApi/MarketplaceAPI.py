from backend.contractsApi.BaseAPI import BaseAPI

from eth_typing import Address
from web3 import Web3
import json
from typing import Optional, List, Dict


class MarketplaceAPI(BaseAPI):
    """
    API для контракту Marketplace (торгівля, аукціони, KYC).
    """
    def __init__(self,
                 web3: Web3,
                 contract_address: str,
                 abi: List[dict],
                 stablecoin_address: str,
                 erc20_abi: List[dict],
                 account_address: str,
                 private_key: str):
        super().__init__(web3, account_address, private_key)
        # Використовуємо checksum адресу для контракту
        contract_addr = self.w3.toChecksumAddress(contract_address)
        stable_addr = self.w3.toChecksumAddress(stablecoin_address)
        self.contract = self.w3.eth.contract(address=contract_addr, abi=abi)
        self.stable = self.w3.eth.contract(address=stable_addr, abi=erc20_abi)

    # KYC
    def set_kyc(self, user: str, approved: bool) -> dict:
        txn = self.contract.functions.setKYC(user, approved).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="setKYC")

    # Direct sale
    def list_item(self, token_contract: str, token_id: int, price: int) -> dict:
        txn = self.contract.functions.listItem(token_contract, token_id, price).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="listItem")

    def buy_item(self, token_contract: str, token_id: int) -> dict:
        txn = self.contract.functions.buyItem(token_contract, token_id).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="buyItem")

    # Auction lifecycle
    def create_timed_auction(self,
                             token_contract: str,
                             token_id: int,
                             reserve_price: int,
                             start_time: int,
                             end_time: int) -> dict:
        txn = self.contract.functions.createTimedAuction(
            token_contract, token_id, reserve_price, start_time, end_time
        ).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="createTimedAuction")

    def place_bid(self, token_contract: str, token_id: int, amount: int) -> dict:
        txn = self.contract.functions.placeBid(token_contract, token_id, amount).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="placeBid")

    def settle_auction(self, token_contract: str, token_id: int) -> dict:
        txn = self.contract.functions.settleAuction(token_contract, token_id).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="settleAuction")

    # ERC20 для ставок
    def approve_stable(self, spender: str, amount: int) -> dict:
        txn = self.stable.functions.approve(spender, amount).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="approveStable")

    def transfer_stable(self, to: str, amount: int) -> dict:
        txn = self.stable.functions.transfer(to, amount).buildTransaction({'from': self.key.address})
        return self._build_and_send(txn, label="transferStable")

    # Read-only методи
    def get_listing(self, token_contract: str, token_id: int) -> Dict:
        """Повертає дані про лістинг (seller, price, active)."""
        return self.contract.functions.listings(token_contract, token_id).call()

    def get_auction(self, token_contract: str, token_id: int) -> Dict:
        """Повертає структуру аукціону.`(seller, reservePrice, highestBid, highestBidder, startTime, endTime, settled)`"""
        return self.contract.functions.auctions(token_contract, token_id).call()

    def get_marketplace_fee(self) -> int:
        """Повертає поточний розмір комісії (basis points)."""
        return self.contract.functions.marketplaceFeeBP().call()

    def get_anti_sniping(self) -> int:
        """Повертає час анти-снайпінгу (секунди)."""
        return self.contract.functions.antiSnipingTime().call()
