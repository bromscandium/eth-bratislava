import eth_account
from eth_typing import HexStr

from backend.contractsApi.BaseAPI import BaseAPI

from web3 import Web3
from typing import List, Dict

class PropertyNFTAPI(BaseAPI):
    """
    API для контракту PropertyNFT (ERC721 + ERC2981 + AccessControl).
    """
    def __init__(self,
                 web3: Web3,
                 contract_address: str,
                 abi: List[dict],
                 account_address: str,
                 private_key: str):
        super().__init__(web3, account_address, private_key)
        addr = self.w3.toChecksumAddress(contract_address)
        self.contract = self.w3.eth.contract(address=addr, abi=abi)

    # Транзакційні методи
    def mint_property(self,
                      to: str,
                      token_uri: str,
                      royalty_receiver: str,
                      royalty_fee_bp: int) -> dict:
        """
        Мінтить новий NFT на адресу `to`.
        Повертає receipt та новий tokenId (з події Transfer).
        """
        txn = self.contract.functions.mintProperty(
            to, token_uri, royalty_receiver, royalty_fee_bp
        ).buildTransaction({'from': self.key.address})
        receipt = self._build_and_send(txn, label="mintProperty")
        # Парсимо подію Transfer
        events = self.contract.events.Transfer().processReceipt(receipt)
        token_id = events[0]['args']['tokenId'] if events else None
        return {'receipt': receipt, 'token_id': token_id}

    def approve(self, operator: str, token_id: int) -> dict:
        """
        Дозволяє `operator` керувати NFT зі `token_id`.
        """
        txn = self.contract.functions.approve(operator, token_id).buildTransaction({})
        return self._build_and_send(txn, label="approveNFT")

    # Read-only методи
    def token_uri(self, token_id: int) -> str:
        """
        Повертає URI метаданих для токена.
        """
        return self.contract.functions.tokenURI(token_id).call()

    def owner_of(self, token_id: int) -> str:
        """
        Повертає власника токена.
        """
        return self.contract.functions.ownerOf(token_id).call()

    def supports_interface(self, interface_id: str) -> bool:
        """
        Перевіряє підтримку стандартів (ERC-721, ERC-2981 тощо).
        `interface_id` у форматі hex, напр. '0x80ac58cd'.
        """
        data = Web3.toBytes(hexstr=HexStr(interface_id))
        return self.contract.functions.supportsInterface(data).call()

    def royalty_info(self, token_id: int, sale_price: int) -> Dict[str, int]:
        """
        Повертає адресу отримувача роялті та суму роялті для даної ціни продажу.
        """
        receiver, amount = self.contract.functions.royaltyInfo(token_id, sale_price).call()
        return {'receiver': receiver, 'amount': amount}
