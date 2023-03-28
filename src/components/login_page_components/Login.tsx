import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import style from "./Login_style.module.css";
import PasswordEyeOpenned from "./login_page_images/open_eye.png";
import PasswordEyeClosed from "./login_page_images/closed_eye.png";
import { LoginResponse, LoginRequestParameters } from "../../interfaces/interfaces";
import { delay } from "../../utils/delay";
import { arrangeLoginRequest } from "../../utils/requests";
import Button from "../common/Button";
import PopUp from "../pop-up/PopUp";

export default function LoginComponent(){

    const [ passwordIsHide, changeVisibility ] = useState<boolean>(true);
    const [ inputType, changeType ] = useState<{[key:string]:string}>({ type: "password"});
    const [ eyeState, changeEyeImage ] = useState<string>(PasswordEyeClosed);
    const [ emailValue, setEmailValue ] = useState<string>("");
    const [ passwordValue, setPasswordValue ] = useState<string>("");
    const [ loadClass, setLoadClass ] = useState<string>("");
    const [ popUpVisibility, setPopUpVisibility ] = useState<string>("invisible");
    const [ didLoginWithSucess, setLogonSucessState ] = useState<boolean>(false);

    const loginButtonProps = {
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

    /*
     * Show or hides the password
     */

    function changePsswdVisibility(): void{  
        changeVisibility( passwordIsHide => !passwordIsHide );
        changeType({ type: `${ passwordIsHide? "password" : "text"}` }); 
        changeEyeImage(( passwordIsHide )? PasswordEyeClosed : PasswordEyeOpenned );  
    }

    /*
     * Update user data according to the inputs 
     */

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>): void{
        setEmailValue(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>): void{
        setPasswordValue(event.target.value);
    }

    /*
     * Validation of user data
     */

    function handleSubmitButtonClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void{
        const requestConfigs = arrangeLoginRequest(emailValue, passwordValue, event);
        if(requestConfigs){
            doLoginRequest(requestConfigs);
        }
    }

    async function doLoginRequest(requestConfig: LoginRequestParameters){
        let response = await fetch("http://localhost:3001/login-user", requestConfig);
        let responseStringfied = await response.json();
        let responseObject = JSON.parse(responseStringfied);
        handleLoginResponse(responseObject);
    }

    async function handleLoginResponse(dataResponsed: LoginResponse){
        clearInputs();
        if(dataResponsed["validated"]){
            let token = dataResponsed["token"];
            localStorage.setItem("token", token);
            await delay(1000);
            setLogonSucessState(true);
        }
        else {
            setPopUpVisibility("visible");
            await delay(5000);
            setPopUpVisibility("invisible");
        }
    }

    function clearInputs(): void{
        setEmailValue("");
        setPasswordValue("");
    }
   
    return (
        <div className={`${style.form__background} ${style[loadClass]}`}>
            <PopUp content={"invalid-login"} visibilityClass={popUpVisibility} status={"error"}></PopUp>
            <div className={style.form__block}>
                <form action="/login" method="post" className={style.form__field} autoComplete="off">
                    <h1 className={style.login__message}>Sign in</h1>
                    <p className={style.welcome__message}>Welcome back to SecNoting!</p>
                    <hr className={style.separation__line}/>
                    <div className={style.email__block}>
                        <label htmlFor="email__input__login" className={style.data__label}> E-mail: </label>
                        <input type="email" name="email" id="email__input__login" className={style.email__input} onChange={(event) => changeEmail(event)} required value={emailValue}/>
                    </div>
                    <div className={style.password__block}>
                        <label htmlFor = "password__input__login" className={style.data__label}> Password: </label>
                        <div className = { style.password__area }>
                            <input type={inputType.type} id="password__input__login" className={style.password__input} onChange={(event) => changePassword(event)} required value={passwordValue}/>
                            <div className={style.toggle__password__visibility} onClick={changePsswdVisibility}>
                                <img src={eyeState} alt="eye image" />
                            </div>
                        </div>            
                    </div>    
                    <Button {...loginButtonProps}/>       
                    <p className={style.login__link}> Doesn't have an account? <a href="/logon">Sign up</a></p>
                </form>
            </div>
            { didLoginWithSucess && (<Navigate to="/internal-page"/>) }
        </div>    
    );
};