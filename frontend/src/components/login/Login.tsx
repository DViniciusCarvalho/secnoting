import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import style from "../../styles/login/Login.module.css";
import PasswordEyeOpenned from "../../assets/open_eye.png";
import PasswordEyeClosed from "../../assets/closed_eye.png";
import { Props } from "../../types/props";
import { delay } from "../../lib/utils";
import Button from "../common/Button";
import StatusPopUp from "../popups/StatusPopUp";
import { login } from "../../actions/login";


export default function LoginComponent(){

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [ passwordIsHide, setPasswordIsHide ] = useState(true);
    const [ loadClass, setLoadClass ] = useState("");
    const [ popUpVisibility, setPopUpVisibility ] = useState("invisible");
    const [ didLoginWithSucess, setLogonSucessState ] = useState(false);
    const [ statusPopUpData, setStatusPopUpData ] = useState({ 
        content: "invalidLogin",  
        status: "error" 
    });

    const loginButtonProps: Props.ButtonProps = {
        message: "Sign in",
        handleSubmitButtonClick: handleSubmitButtonClick
    };
    
    let alreadyLoaded = false;

    useEffect(() => {
        if (!alreadyLoaded){
            setLoadClass("loaded");
        }
        alreadyLoaded = true;
    }, []);


    function changePsswdVisibility(): void {  
        setPasswordIsHide(passwordIsHide => !passwordIsHide);
    }

    function handleSubmitButtonClick(): void {
        const emailElement = emailRef.current! as HTMLInputElement;
        const passwordElement = passwordRef.current! as HTMLInputElement;

        const emailValue = emailElement.value;
        const passwordValue = passwordElement.value;

        handleLogin(emailValue, passwordValue);
    }


    async function handleLogin(email: string, password: string): Promise<void> {
        const response = await login(email, password);

        clearInputs();

        let statusType = "invalidLogin";
        let success = false;

        if (response) {
            if (response.validated) {
                const token = response.token;
                localStorage.setItem("token", token);
                await delay(1000);
                setLogonSucessState(true);
                return;
            }
        }

        showPopUp(statusType, success);
    }


    async function showPopUp(content: string, success: boolean): Promise<void> {
        setStatusPopUpData({ 
            content, 
            status: success? "success" : "error" 
        });

        setPopUpVisibility("visible");
        await delay(5000);
        setPopUpVisibility("invisible");
    }


    function clearInputs(): void {
        const emailElement = emailRef.current! as HTMLInputElement;
        const passwordElement = passwordRef.current! as HTMLInputElement;

        emailElement.value = "";
        passwordElement.value = "";
    }
   

    return (
        <div className={`${style.form__background} ${style[loadClass]}`}>
            <StatusPopUp {...statusPopUpData} visibilityClass={popUpVisibility}/>
            <div className={style.form__block}>
                <form  
                  className={style.form__field} 
                  method="post"
                  autoComplete="off"
                  onSubmit={(event) => event.preventDefault()}
                >
                    <h1 className={style.login__message}>Sign in</h1>
                    <p className={style.welcome__message}>Welcome back to SecNoting!</p>
                    <hr className={style.separation__line}/>
                    <div className={style.email__block}>
                        <label 
                          htmlFor="email__input__login" 
                          className={style.data__label}
                        > 
                            E-mail: 
                        </label>
                        <input 
                          type="email" 
                          name="email" 
                          id="email__input__login" 
                          className={style.email__input} 
                          ref={emailRef}
                          required={true}
                        />
                    </div>
                    <div className={style.password__block}>
                        <label 
                          htmlFor = "password__input__login" 
                          className={style.data__label}
                        > 
                            Password: 
                        </label>
                        <div className={style.password__area}>
                            <input 
                              type={passwordIsHide? "password" : "text"} 
                              id="password__input__login" 
                              className={style.password__input} 
                              ref={passwordRef} 
                              required={true}
                            />
                            <div 
                              className={style.toggle__password__visibility} 
                              onClick={changePsswdVisibility}
                            >
                                <img 
                                  src={passwordIsHide? PasswordEyeClosed : PasswordEyeOpenned} alt="eye image"
                                />
                            </div>
                        </div>            
                    </div>    
                    <Button {...loginButtonProps}/>       
                    <p className={style.login__link}> 
                        Doesn't have an account? <a href="/logon">Sign up</a>
                    </p>
                </form>
            </div>
            { didLoginWithSucess && (<Navigate to="/internal-page"/>) }
        </div>    
    );
};