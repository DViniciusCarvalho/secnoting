from sqlalchemy import text
from backend.database.connection import Connection


def add_user(name, email, password):
    query = text("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)")
    
    values = { 
        "name": name, 
        "email": email, 
        "password": password 
    }

    Connection.execute_query_with_value(query, values)
    user_id = get_user_id(email, password)
    return user_id

    
def get_user_id(email, password):
    query = text("SELECT id FROM users WHERE email = :email AND password = :password")

    values = { 
        "email": email, 
        "password": password 
    }

    select = Connection.execute_query_with_value(query, values)
    user_info = Connection.fetch_data(select)
    user_id = user_info[0][0]
    return user_id


def verify_if_user_exists(email):
    query = text("SELECT * FROM users WHERE email = :email")

    value = { 
        "email": email 
    }

    select = Connection.execute_query_with_value(query, value)
    result = Connection.fetch_data(select)
    if result:
        return True
    return False


def create_tables(user_id):
    tables = ["folders", "completeds", "deleteds"]

    for table in tables:
        query = text(f"""CREATE TABLE {table}_{user_id} ( 
                            id INT AUTO_INCREMENT NOT NULL, 
                            title VARCHAR(200) NOT NULL, 
                            content TEXT NOT NULL, 
                            timestamp BIGINT NOT NULL, 
                            PRIMARY KEY (id) 
                        )""")
        
        Connection.execute_query_without_value(query)


def user_exists(email, password):
    query = text("SELECT * FROM users WHERE email = :email AND password = :password")

    values = { 
        "email": email, 
        "password": password 
    }

    select = Connection.execute_query_with_value(query, values)
    database_response = Connection.fetch_data(select)

    if database_response:
        return True
    return False


def get_user_tables(user_id, table):
    query = text(f"SELECT id, title, content, timestamp FROM {table}_{user_id}")
    select = Connection.execute_query_without_value(query)
    complete_table = Connection.fetch_data(select)
    return complete_table


def get_user_information(user_id):
    query = text("SELECT name, email FROM users WHERE id = :id")

    values = { 
        "id": user_id 
    }

    select = Connection.execute_query_with_value(query, values)
    user_info = Connection.fetch_data(select)
    return user_info


def create_new_annotation(user_id="", title="", content="", timestamp=0, *args, **kwargs):
    query = text(f"INSERT INTO folders_{user_id} (title, content, timestamp) VALUES (:title, :content, :timestamp)")

    values = { 
        "title": title, 
        "content": content, 
        "timestamp": timestamp
    }

    Connection.execute_query_with_value(query, values)


def get_annotation_id(table, user_id, timestamp):
    query = text(f"SELECT * FROM {table}_{user_id} WHERE timestamp = :timestamp")

    value = { 
        "timestamp": timestamp
    }

    select = Connection.execute_query_with_value(query, value)
    raw_list = Connection.fetch_data(select)
    annotation_raw_id = raw_list[0]
    annotation_id = annotation_raw_id[0]
    return annotation_id


def remove_from_folders(user_id, annotation_id):
    query = text(f"DELETE FROM folders_{user_id} WHERE id = :annot_id")

    values = { 
        "annot_id": annotation_id 
    }

    result = Connection.execute_query_with_value(query, values)

    if result:
        return True
    return False


def add_to_deleteds(user_id, title, content, timestamp):
    query = text(f"INSERT INTO deleteds_{user_id} (title, content, timestamp) VALUES (:title, :content, :timestamp)")

    values = { 
        "title": title, 
        "content": content, 
        "timestamp": timestamp 
    }

    result = Connection.execute_query_with_value(query, values)

    if result:
        return True
    return False


def update_annotation(table, user_id, title, content, timestamp, annotation_id):
    query = text(f"UPDATE {table}_{user_id} SET title = :title, content = :content, timestamp = :timestamp WHERE id = :annot_id")

    values = {
        "title": title, 
        "content": content, 
        "timestamp": timestamp, 
        "annot_id": annotation_id
    }    

    result = Connection.execute_query_with_value(query, values)

    if result:
        return True
    return False


def delete_annotation_permanently(user_id, annotation_id):
    query = text(f"DELETE FROM deleteds_{user_id} WHERE id = :annot_id")

    value = {
        "annot_id": annotation_id
    }

    result = Connection.execute_query_with_value(query, value)

    if result:
        return True
    return False
