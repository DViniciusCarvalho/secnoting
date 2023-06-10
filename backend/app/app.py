from pathlib import Path
from sys import path

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(root)

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn

from routes.logon import logon
from routes.login import login
from routes.mainpage import mainpage
from routes.annotation import add, save
from routes.annotation.delete import temporary, permanent
from tests.security.sql_injection import sql_injection_tester
from tests.security.xss import xss_tester


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

SERVER_HOST = "localhost"
SERVER_PORT = 3001


# routes
app.include_router(logon.router)
app.include_router(login.router)
app.include_router(mainpage.router)
app.include_router(add.router)
app.include_router(save.router)
app.include_router(temporary.router)
app.include_router(permanent.router)

# tests
app.include_router(sql_injection_tester.router)
app.include_router(xss_tester.router)

if __name__ == "__main__":
    uvicorn.run(
        "app:app", 
        host=SERVER_HOST, 
        port=SERVER_PORT,
        reload=True
    )

