import json

def create_login_response(validated, token):
    response_dict = { "validated": validated, "token": token }
    response_stringfied = json.dumps(response_dict)
    return response_stringfied

def create_logon_response(user_exists, valid_input):
    response_dict = { "user_exists" : user_exists, "valid_input": valid_input }
    response_stringfied = json.dumps(response_dict)
    return response_stringfied

def create_jwt_response(valid, user_id):
    return { "valid": valid, "id": user_id }

def arrange_table_response(table):
    table_rows_list = []
    for row in table:
        annot_id = row[0]
        title = row[1]
        content = row[2]
        timestamp = row[3]
        row_dict = { "id": annot_id, "title": title, "content": content, "timestamp": timestamp }
        table_rows_list.append(row_dict)
    return table_rows_list

def assembly_tables_dict(folders_table, completeds_table, deleteds_table):
    tables_dict = { "folders": folders_table, "completeds": completeds_table, "deleteds": deleteds_table }
    return tables_dict

def arrange_user_information(user_information):
    user_name = user_information[0][0]
    user_email = user_information[0][1]
    return { "name": user_name, "email": user_email }

def create_tables_response(is_authentic_user, tables_dict, user_information):
    response_dict = { "authenticity": is_authentic_user, "tables": tables_dict, "user_info": user_information }
    response_stringfied = json.dumps(response_dict)
    return response_stringfied

def create_annotation_response(authorized, annot_id, title, content, timestamp):
    annotation_info = { "id": annot_id, "title": title, "content": content, "timestamp": timestamp * 1000 }
    response_dict = { "authorized": authorized, "annotation_info": annotation_info }
    response_stringfied = json.dumps(response_dict)
    return response_stringfied

def create_moved_annotation_response(authorized, annot_deleteds_id, done):
    response_dict = { "authorized": authorized, "id": annot_deleteds_id, "done": done }
    response_stringfied = json.dumps(response_dict)
    return response_stringfied
 
def create_save_response(authorized, done):
    response_dict = { "authorized": authorized, "done": done }
    response_stringfied = json.dumps(response_dict)
    return response_stringfied

def create_delete_response(authorized, done):
    response_dict = { "authorized": authorized, "done": done }
    response_stringfied = json.dumps(response_dict)
    return response_stringfied