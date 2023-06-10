from sqlalchemy import create_engine, ResultProxy
from sqlalchemy.orm import sessionmaker
from os import getenv
from dotenv import load_dotenv


load_dotenv()

class Connection:
    
    _root_password = getenv("MYSQL_ROOT_PASSWORD")
    _host = getenv("MYSQL_HOST")
    _port = getenv("MYSQL_PORT")
    _database = getenv("MYSQL_DATABASE")

    engine = create_engine(f"mysql://root:{_root_password}@{_host}:{_port}/{_database}")
    Session = sessionmaker(bind = engine)

    @staticmethod
    def execute_query_with_value(query: str, values: dict[str]):
        with Connection.Session() as session:
            value_returned = session.execute(query, values)
            session.commit()
            return value_returned
    
    @staticmethod
    def execute_query_without_value(query: str):
        with Connection.Session() as session:
            value_returned = session.execute(query)
            session.commit()
            return value_returned

    @staticmethod
    def fetch_data(raw_data: ResultProxy):
        fetched_data = raw_data.fetchall()
        return fetched_data