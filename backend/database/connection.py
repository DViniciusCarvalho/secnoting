from sqlalchemy import create_engine, ResultProxy
from sqlalchemy.orm import sessionmaker
from os import getenv
from dotenv import load_dotenv


load_dotenv()

class Connection:
    
    _user = getenv("MYSQL_USER")
    _password = getenv("MYSQL_PASSWORD")
    _host = getenv("MYSQL_HOST")
    _port = getenv("MYSQL_PORT")
    _database = getenv("MYSQL_DATABASE")

    engine = create_engine(f"mysql://{_user}:{_password}@{_host}:{_port}/{_database}")
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