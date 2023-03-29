from sqlalchemy import create_engine, ResultProxy
from sqlalchemy.orm import sessionmaker


class Connection:
    engine = create_engine("mysql://user:password@host:port/database")
    Session = sessionmaker(bind = engine)
    session = Session()

    @staticmethod
    def execute_query_with_value(query: str, values: dict[str]):
        value_returned = Connection.session.execute(query, values)
        Connection.session.commit()
        return value_returned
    
    @staticmethod
    def execute_query_without_value(query: str):
        value_returned = Connection.session.execute(query)
        Connection.session.commit()
        return value_returned

    @staticmethod
    def fetch_data(raw_data: ResultProxy):
        fetched_data = raw_data.fetchall()
        return fetched_data