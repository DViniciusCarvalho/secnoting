from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[2]
sys.path.append(str(root))

from fastapi import APIRouter
from fastapi.requests import Request

from IO_handler.webtoken import return_id_if_is_valid
from database.operations import get_user_tables, get_user_information
from IO_handler.responses import arrange_table_response, assembly_tables_dict
from IO_handler.responses import arrange_user_information, create_tables_response


router = APIRouter()

@router.post("/internal-page-validation")
async def return_page(request: Request):
    data = await request.json()
    user_token = data["token"]
    jwt_result = return_id_if_is_valid(user_token)
    jwt_is_valid = jwt_result["valid"]
    if jwt_is_valid:
        user_id = jwt_result["id"]
        folders_tables = get_user_tables(user_id, "folders")
        completeds_tables = get_user_tables(user_id, "completeds")
        deleteds_tables = get_user_tables(user_id, "deleteds")
        folders_list = arrange_table_response(folders_tables)
        completeds_list = arrange_table_response(completeds_tables)
        deleteds_list = arrange_table_response(deleteds_tables)
        tables_dict = assembly_tables_dict(folders_list, completeds_list, deleteds_list)
        user_raw_informations = get_user_information(user_id)
        user_arranged_informations = arrange_user_information(user_raw_informations)
        return create_tables_response(True, tables_dict, user_arranged_informations)
    else:
        return create_tables_response(False, "", "")