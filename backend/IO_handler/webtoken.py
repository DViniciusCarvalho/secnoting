from .responses import create_jwt_response
import time
import jwt
import sys

ALG = "HS256"
SECRET = "HJ2731WEM@#u*@738273424"

def generate_token(user_id):
    iat = time.time()
    exp = iat + 2 * 60 * 60
    time.sleep(0.8)
    payload = { "sub": user_id, "iat": iat, "exp": exp }
    jwt_token = jwt.encode(payload, SECRET, ALG)
    return jwt_token

def is_valid_token(user_token):
    try:
        print(user_token)
        token = jwt.decode(user_token, SECRET, algorithms = [ALG])
        if float(token["exp"]) > time.time():
            return token
        raise jwt.InvalidSignatureError
    except jwt.InvalidSignatureError:
        return False
    except ValueError:
        sys.exit()
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
        return token["sub"]
    return False

