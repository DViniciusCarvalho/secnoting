from datetime import datetime
from sys import exit

from jwt import encode, decode, InvalidSignatureError

from .responses import create_jwt_response


ALG = "HS256"
SECRET = "HJ2731WEM@#u*@738273424"

def generate_token(user_id):
    iat = datetime.now().timestamp()
    exp = iat + 2 * 60 * 60
    payload = { "sub": user_id, "iat": iat, "exp": exp }
    jwt_token = encode(payload, SECRET, ALG)
    return jwt_token

def is_valid_token(user_token):
    try:
        print(user_token)
        token = decode(user_token, SECRET, algorithms = [ALG])
        if float(token["exp"]) > datetime.now().timestamp():
            return token
        raise InvalidSignatureError
    except InvalidSignatureError:
        return False
    except ValueError:
        exit()
    except Exception:
        return False

def return_id_if_is_valid(user_token):
    token = is_valid_token(user_token)
    if token:
        return create_jwt_response(True, token["sub"])
    return create_jwt_response(False, "")

    
def decode_token(user_token):
    token = is_valid_token(user_token)
    if token:
        return int(token["sub"])
    return False

