#!/usr/bin/python3

from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[2]
print(root)
sys.path.append(str(root))

from fastapi import APIRouter, Request

from IO_handler.webtoken import generate_token
from database.operations import user_exists, get_user_id
from IO_handler.responses import create_login_response
from IO_handler.sanitization import some_input_is_dirty


router = APIRouter()

@router.post("/login-user")
async def login_user(request: Request):
    user_data = await request.json()
    user_email = user_data["email"]
    user_password = user_data["password"]
    if not some_input_is_dirty(user_email, user_password):
        credentials_ok = user_exists(user_email, user_password)
        if credentials_ok:
            user_id = get_user_id(user_email, user_password)
            user_jwt_token = generate_token(user_id)
            return create_login_response(True, user_jwt_token)
    return create_login_response(False, "")
