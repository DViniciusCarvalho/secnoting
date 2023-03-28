import React, { useEffect, useRef, useState } from "react";
import style from "./Logon_style.module.css";
import PasswordEyeOpenned from "../login_page_components/login_page_images/open_eye.png";
import PasswordEyeClosed from "../login_page_components/login_page_images/closed_eye.png";
import { LogonRequestParameters, LogonResponse } from "../../interfaces/interfaces";
import { Navigate } from "react-router-dom";
import  PopUp from "../pop-up/PopUp";
import { delay } from "../../utils/delay";
import { arrangeLogonRequest } from "../../utils/requests";
import Button from "../common/Button";

export default function LogonComponent(){
    
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const [ passwordIsHide, changeVisibility ] = useState<boolean>(true);
    const [ inputType, changeType ] = useState<{[key: string]: string}>({ type: "password"});
    const [ eyeState, changeEyeImage ] = useState<string>( PasswordEyeClosed );
    const [ nameValue, setNameValue ] = useState<string>("");
    const [ emailValue, setEmailValue ] = useState<string>("");
    const [ passwordValue, setPasswordValue ] = useState<string>("");
    const [ popUpVisibility, setPopUpVisibility ] = useState<string>("invisible");
    const [ didLogonWithSucess, setLogonSucessState ] = useState<boolean>(false);
    const [ loadClass, setLoadClass ] = useState<string>("");

    const [ registerStatus, setRegisterStatus ] = useState({ 
        type: "",  
        status: "error" 
    });

    const logonButtonProps = {
        message: "Sign up",
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

    function changeName(event: React.ChangeEvent<HTMLInputElement>): void{
        setNameValue(event.target.value);
    }

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
        const requestConfigs = arrangeLogonRequest(nameValue, emailValue, passwordValue, event);
        if(requestConfigs){
            doLogonRequest(requestConfigs);
        }
    }

    async function doLogonRequest(requestConfig: LogonRequestParameters){
        let response = await fetch("http://localhost:3001/logon-user", requestConfig);
        let responseStringfied = await response.json();
        let responseObject = JSON.parse(responseStringfied);
        handleLogonResponse(responseObject);
    }

    async function handleLogonResponse(dataResponsed: LogonResponse){
        clearInputs();
        if (dataResponsed["valid_input"]){
            if(dataResponsed["user_exists"]){
                setRegisterStatus({ type: "invalid-user", status: "error" });
                setPopUpVisibility("visible");
                await delay(5000);
                setPopUpVisibility("invisible");
            }
            else {
                setRegisterStatus({ type: "logon-sucess", status: "success" });
                setPopUpVisibility("visible");
                await delay(5000);
                setPopUpVisibility("invisible");
                await delay(1000);
                setLogonSucessState(true);
            }
        }
        else {
            setRegisterStatus({ type: "invalid-input", status: "error" });
            setPopUpVisibility("visible");
            await delay(5000);
            setPopUpVisibility("invisible");
        }
    }

    function clearInputs(): void{
        setNameValue("");
        setEmailValue("");
        setPasswordValue("");
    }

    return (
        <div className = {`${style.form__background} ${style[loadClass]}`}>
            <PopUp content={registerStatus.type} visibilityClass={popUpVisibility} status={registerStatus.status}/>
            <div className = { style.form__block }>
                <form action="/logon" method="post" className={style.form__field} autoComplete="off">
                    <h1 className={style.logon__message}>Sign up</h1>
                    <p className={style.welcome__message}>Welcome to SecNoting!</p>
                    <hr className={style.separation__line}/>
                    <div className={style.name__block}>
                        <label htmlFor="name__input__logon" className={style.data__label}> Name: </label>
                        <input type="text" name="name" id="name__input__logon" className={ style.name__input } onChange={(event) => changeName(event)} required ref={nameInput} value={nameValue}/>
                    </div>
                    <div className={style.email__block}>
                        <label htmlFor="email__input" className={style.data__label}> E-mail: </label>
                        <input type="email" name="email" id="email__input__logon" className={style.email__input} onChange={(event) => changeEmail(event)} required ref={emailInput} value={emailValue}/>
                    </div>
                    <div className={style.password__block}>
                        <label htmlFor="password__input" className={style.data__label}> Password: </label>
                        <div className={style.password__area}>
                            <input type={inputType.type} id="password__input__logon" className={style.password__input} onChange={(event)=> changePassword(event)} required ref={passwordInput} value={passwordValue}/>
                            <div className={style.toggle__password__visibility} onClick={changePsswdVisibility}>
                                <img src={eyeState} alt="eye image"/>
                            </div>
                        </div>            
                    </div>        
                    <Button {...logonButtonProps}/>   
                    <p className={style.logon__link}> Already have an account? <a href="/login">Sign in</a></p>
                </form>
            </div>
            { didLogonWithSucess && (<Navigate to="/login"/>) }
        </div>      
    );
};