from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[3]
sys.path.append(str(root))

from fastapi import APIRouter, Request

from IO_handler.webtoken import decode_token
from database.operations import delete_annotation_permanently
from IO_handler.responses import create_delete_response


router = APIRouter()

@router.delete("/delete-annotation-permanently")
async def delete_permanently(request: Request):
    data = await request.json()
    annot_id = data["id"]
    token = data["token"]
    valid_id = decode_token(token)
    if valid_id:
        success = delete_annotation_permanently(valid_id, annot_id)
        if success:
            return create_delete_response(True, True)
        return create_delete_response(True, False)
    else:
        return create_delete_response(False, False)