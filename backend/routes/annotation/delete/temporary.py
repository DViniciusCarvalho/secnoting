from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[3]
sys.path.append(str(root))

from fastapi import APIRouter, Request

from database.operations import remove_from_folders, add_to_deleteds, get_annotation_id
from IO_handler.webtoken import decode_token
from IO_handler.responses import create_moved_annotation_response


router = APIRouter()

@router.delete("/delete-folder-annotation")
async def send_annotation_to_deleted(request: Request):
    data = await request.json()
    user_token = data["token"]
    annot_id = data["id"]
    annot_title = data["title"]
    annot_content = data["content"]
    annot_timestamp = data["timestamp"]
    valid_id = decode_token(user_token)
    if valid_id:
        sucess_in_remove = remove_from_folders(valid_id, annot_id)
        if sucess_in_remove:
            if add_to_deleteds(valid_id, annot_title, annot_content, annot_timestamp):
                annot_deleteds_id = get_annotation_id("deleteds", valid_id, annot_timestamp)
                return create_moved_annotation_response(True, annot_deleteds_id, True)
            return create_moved_annotation_response(True, "", False)
        return create_moved_annotation_response(True, "", False)
    else:
        return create_moved_annotation_response(False, "", False)