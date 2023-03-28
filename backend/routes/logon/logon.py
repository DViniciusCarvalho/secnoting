from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[2]
sys.path.append(str(root))

from fastapi import APIRouter, Request

from database.operations import verify_if_user_exists, add_user, create_tables
from IO_handler.sanitization import some_input_is_dirty
from IO_handler.responses import create_logon_response


router = APIRouter()

@router.post("/logon-user")
async def register_new_user(request: Request):
    data = await request.json()
    name = data["name"]
    email = data["email"]
    password = data["password"]
    if not some_input_is_dirty(name, email, password):
        if verify_if_user_exists(email):
            return create_logon_response(True, True)
        else:
            user_id = add_user(name, email, password)
            create_tables(user_id)
            return create_logon_response(False, True)
    else:
        return create_logon_response(False, False)
