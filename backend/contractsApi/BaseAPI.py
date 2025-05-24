import eth_account
from eth_typing import Address
from web3 import Web3
import json
from typing import Optional, List, Dict

from web3.types import TxReceipt


class BaseAPI:
    """
    Базовий клас API для взаємодії з контрактами через Web3.
    """
    def __init__(self, web3: Web3, account_address: str, private_key: str):
        self.w3 = web3
        self.account = self.w3.toChecksumAddress(account_address)
        self.key = web3.eth.account.from_key(private_key)

    def _build_and_send(self, txn, label: Optional[str] = None) -> dict:
        """
        Формує, підписує та надсилає транзакцію.
        Повертає receipt.
        """
        txn.update({
            'from': self.key.address,
            'nonce': self.w3.eth.get_transaction_count(self.account),
            'gas': txn.get('gas', 500_000),
            # 'gasPrice': self.w3.eth.gasPrice,
        })
        signed = self.key.sign_transaction(txn)
        tx_hash = self.w3.eth.send_raw_transaction(signed.rawTransaction)
        receipt: TxReceipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        if label:
            print(f"[{label}] txHash={tx_hash.hex()} status={receipt.items()}")
        return receipt
