from datetime import datetime
from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[2]
sys.path.append(str(root))

from fastapi import APIRouter, Request

from database.operations import update_annotation
from IO_handler.webtoken import decode_token
from IO_handler.responses import create_save_response


router = APIRouter()

@router.put("/save-annotation")
async def save_annotation(request: Request):
    data = await request.json()
    table_name = data["tableName"]
    annot_id = data["id"]
    title = data["title"]
    content = data["content"]
    token = data["token"]
    valid_id = decode_token(token)
    
    if valid_id:
        timestamp = int(datetime.now().timestamp() * 1000)
        success = update_annotation(table_name, valid_id, title, content, timestamp, annot_id)
        if success:
            return create_save_response(True, timestamp, True)
        return create_save_response(True, timestamp, False)
    return create_save_response(False, timestamp, False)