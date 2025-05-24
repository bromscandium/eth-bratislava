import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Any, Dict, List, Optional


class DBClient:
    def __init__(self, dsn: str):
        """
        Initialize the database client.

        :param dsn: Data Source Name for PostgreSQL connection
        """
        self.dsn = dsn
        self.conn = psycopg2.connect(self.dsn)
        self.conn.autocommit = True

    def _execute(self, query: str, params: tuple = (), fetch: bool = False) -> Optional[List[Dict[str, Any]]]:
        with self.conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params)
            if fetch:
                return cursor.fetchall()
        return None

    # ----------------- Members ----------------- #
    def select_members(self) -> List[Dict[str, Any]]:
        query = "SELECT * FROM members;"
        return self._execute(query, fetch=True)  # type: ignore

    def select_member_by_id(self, member_id: str) -> Optional[Dict[str, Any]]:
        query = "SELECT * FROM members WHERE id = %s;"
        results = self._execute(query, (member_id,), fetch=True)
        return results[0] if results else None

    def insert_member(self, data: Dict[str, Any]) -> None:
        keys = data.keys()
        cols = ", ".join(keys)
        vals = ", ".join(["%s"] * len(keys))
        query = f"INSERT INTO members({cols}) VALUES({vals});"
        self._execute(query, tuple(data.values()))

    def update_member(self, member_id: str, data: Dict[str, Any]) -> None:
        assignments = ", ".join([f"{k} = %s" for k in data.keys()])
        query = f"UPDATE members SET {assignments}, updated_at = NOW() WHERE id = %s;"
        params = tuple(data.values()) + (member_id,)
        self._execute(query, params)

    def delete_member(self, member_id: str) -> None:
        query = "DELETE FROM members WHERE id = %s;"
        self._execute(query, (member_id,))

    # ----------------- Property ----------------- #
    def select_properties(self) -> List[Dict[str, Any]]:
        query = "SELECT * FROM property;"
        return self._execute(query, fetch=True)  # type: ignore

    def select_property_by_id(self, property_id: str) -> Optional[Dict[str, Any]]:
        query = "SELECT * FROM property WHERE id = %s;"
        results = self._execute(query, (property_id,), fetch=True)
        return results[0] if results else None

    def insert_property(self, data: Dict[str, Any]) -> None:
        keys = data.keys()
        cols = ", ".join(keys)
        vals = ", ".join(["%s"] * len(keys))
        query = f"INSERT INTO property({cols}) VALUES({vals});"
        self._execute(query, tuple(data.values()))

    def update_property(self, property_id: str, data: Dict[str, Any]) -> None:
        assignments = ", ".join([f"{k} = %s" for k in data.keys()])
        query = f"UPDATE property SET {assignments} WHERE id = %s;"
        params = tuple(data.values()) + (property_id,)
        self._execute(query, params)

    def delete_property(self, property_id: str) -> None:
        query = "DELETE FROM property WHERE id = %s;"
        self._execute(query, (property_id,))

    # ----------------- Auction ----------------- #
    def select_auctions(self) -> List[Dict[str, Any]]:
        query = "SELECT * FROM auction;"
        return self._execute(query, fetch=True)  # type: ignore

    def select_auction_by_id(self, auction_id: str) -> Optional[Dict[str, Any]]:
        query = "SELECT * FROM auction WHERE id = %s;"
        results = self._execute(query, (auction_id,), fetch=True)
        return results[0] if results else None

    def insert_auction(self, data: Dict[str, Any]) -> None:
        keys = data.keys()
        cols = ", ".join(keys)
        vals = ", ".join(["%s"] * len(keys))
        query = f"INSERT INTO auction({cols}) VALUES({vals});"
        self._execute(query, tuple(data.values()))

    def update_auction(self, auction_id: str, data: Dict[str, Any]) -> None:
        assignments = ", ".join([f"{k} = %s" for k in data.keys()])
        query = f"UPDATE auction SET {assignments} WHERE id = %s;"
        params = tuple(data.values()) + (auction_id,)
        self._execute(query, params)

    def delete_auction(self, auction_id: str) -> None:
        query = "DELETE FROM auction WHERE id = %s;"
        self._execute(query, (auction_id,))

    # ----------------- Transaction ----------------- #
    def select_transactions(self) -> List[Dict[str, Any]]:
        query = "SELECT * FROM transaction;"
        return self._execute(query, fetch=True)  # type: ignore

    def select_transaction_by_id(self, transaction_id: str) -> Optional[Dict[str, Any]]:
        query = "SELECT * FROM transaction WHERE id = %s;"
        results = self._execute(query, (transaction_id,), fetch=True)
        return results[0] if results else None

    def insert_transaction(self, data: Dict[str, Any]) -> None:
        keys = data.keys()
        cols = ", ".join(keys)
        vals = ", ".join(["%s"] * len(keys))
        query = f"INSERT INTO transaction({cols}) VALUES({vals});"
        self._execute(query, tuple(data.values()))

    def update_transaction(self, transaction_id: str, data: Dict[str, Any]) -> None:
        assignments = ", ".join([f"{k} = %s" for k in data.keys()])
        query = f"UPDATE transaction SET {assignments} WHERE id = %s;"
        params = tuple(data.values()) + (transaction_id,)
        self._execute(query, params)

    def delete_transaction(self, transaction_id: str) -> None:
        query = "DELETE FROM transaction WHERE id = %s;"
        self._execute(query, (transaction_id,))

    def close(self) -> None:
        self.conn.close()
