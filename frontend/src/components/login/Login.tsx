import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import style from "../../styles/login/Login.module.css";
import PasswordEyeOpenned from "../../assets/open_eye.png";
import PasswordEyeClosed from "../../assets/closed_eye.png";
import { Props } from "../../types/props";
import { delay } from "../../lib/utils";
import Button from "../common/Button";
import PopUp from "../popups/StatusPopUp";
import { login } from "../../actions/login";


export default function LoginComponent(){

    const [ passwordIsHide, setPasswordIsHide ] = useState(true);

    const [ inputType, changeType ] = useState({ 
        type: "password"
    });

    const [ eyeStateImage, setEyeStateImage ] = useState(PasswordEyeClosed);
    const [ emailValue, setEmailValue ] = useState("");
    const [ passwordValue, setPasswordValue ] = useState("");
    const [ loadClass, setLoadClass ] = useState("");
    const [ popUpVisibility, setPopUpVisibility ] = useState("invisible");
    const [ didLoginWithSucess, setLogonSucessState ] = useState(false);

    const [ registerStatus, setRegisterStatus ] = useState({ 
        type: "invalid-login",  
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

    /*
     * Show or hides the password
     */

    function changePsswdVisibility(): void{  
        setPasswordIsHide(passwordIsHide => !passwordIsHide);
        changeType({ 
            type: `${ passwordIsHide? "password" : "text"}` 
        }); 
        setEyeStateImage(( passwordIsHide )? PasswordEyeClosed : PasswordEyeOpenned);  
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
        event.preventDefault();
        handleLogin(emailValue, passwordValue);
    }

    async function handleLogin(email: string, password: string) {
        const response = await login(email, password);

        clearInputs();

        let statusType = "invalid-login";
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

    async function showPopUp(type: string, success: boolean) {
        setRegisterStatus({ 
            type, 
            status: success? "success" : "error" 
        });

        setPopUpVisibility("visible");
        await delay(5000);
        setPopUpVisibility("invisible");
    }

    function clearInputs(): void{
        setEmailValue("");
        setPasswordValue("");
    }
   
    return (
        <div className={`${style.form__background} ${style[loadClass]}`}>
            <PopUp content={registerStatus.status} visibilityClass={popUpVisibility} status={registerStatus.type}/>
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
                                <img src={eyeStateImage} alt="eye image" />
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