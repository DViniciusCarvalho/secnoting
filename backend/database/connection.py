from sqlalchemy import create_engine, ResultProxy
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql://root:psswd@localhost:3306/noteapp")

Session = sessionmaker(bind = engine)
session = Session()


class Connection:
    engine = create_engine("mysql://root:psswd@localhost:3306/noteapp")
    Session = sessionmaker(bind = engine)
    session = Session()

    @staticmethod
    def execute_query_with_value(query: str, values: dict[str]):
        value_returned = session.execute(query, values)
        session.commit()
        return value_returned
    
    @staticmethod
    def execute_query_without_value(query: str):
        value_returned = session.execute(query)
        session.commit()
        return value_returned

    @staticmethod
    def fetch_data(raw_data: ResultProxy):
        fetched_data = raw_data.fetchall()
        return fetched_data