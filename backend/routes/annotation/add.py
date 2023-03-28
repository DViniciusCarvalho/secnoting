from pathlib import Path
import sys
import time

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[2]
sys.path.append(str(root))

from fastapi import APIRouter, Request

from database.operations import create_new_annotation, get_annotation_id
from IO_handler.webtoken import decode_token
from IO_handler.responses import create_annotation_response


router = APIRouter()

@router.post("/add-annotation")
async def add_annotation(request: Request):
    data = await request.json()
    token = data["token"]
    valid_id = int(decode_token(token))
    if valid_id:
        current_timestamp = time.time() * 1000
        create_new_annotation(valid_id, "", "", current_timestamp)
        annotation_id = get_annotation_id("folders", valid_id, current_timestamp)
        return create_annotation_response(True, annotation_id, "", "", current_timestamp)
    else:
        return create_annotation_response(False, "", "", "", 0)


    