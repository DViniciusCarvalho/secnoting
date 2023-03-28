import time

from fastapi import APIRouter, Request
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

router = APIRouter()

@router.get("/login-xss")
def do_xss_test(request: Request):
    xss_testing()

def xss_testing():

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)

    def login_page():
        driver.get("http://localhost:3000/login")

    def find_email_field():
        email_field = driver.find_element(By.ID, "email__input__login")
        return email_field

    def find_password_field():
        password_field = driver.find_element(By.ID, "password__input__login")
        return password_field

    def find_login_button():
        login_button = driver.find_element(By.ID, "register__button")
        return login_button
    
    def test_queries(email, password, login):
        try:
            with open("backend/tests/security/xss/xss_wordlist.txt") as wordlist:
                words = wordlist.read()
                for word in words.split("\n"):
                    email.send_keys(word)
                    password.send_keys(word)
                    login.click()
                    time.sleep(2)
                    assert driver.current_url == "http://localhost:3000/login"
        except AssertionError:
            print("A security vulnerability was found!")
            driver.quit()

    time.sleep(6)
    login_page()
    time.sleep(4)
    email = find_email_field()
    password = find_password_field()
    login = find_login_button()
    test_queries(email, password, login)