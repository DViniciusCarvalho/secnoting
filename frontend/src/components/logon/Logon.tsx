import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/logon/Logon.module.css";
import PasswordEyeOpenned from "../../assets/open_eye.png";
import PasswordEyeClosed from "../../assets/closed_eye.png";
import { Request } from "../../types/request";
import { Response } from "../../types/response";
import { Navigate } from "react-router-dom";
import PopUp from "../popups/StatusPopUp";
import { delay } from "../../lib/utils";
import Button from "../common/Button";
import { logon } from "../../actions/logon";


export default function LogonComponent(){
    
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const [ passwordIsHide, changeVisibility ] = useState(true);

    const [ inputType, changeType ] = useState({ 
        type: "password" 
    });

    const [ eyeState, changeEyeImage ] = useState(PasswordEyeClosed);
    const [ nameValue, setNameValue ] = useState("");
    const [ emailValue, setEmailValue ] = useState("");
    const [ passwordValue, setPasswordValue ] = useState("");
    const [ popUpVisibility, setPopUpVisibility ] = useState("invisible");
    const [ didLogonWithSucess, setLogonSucessState ] = useState(false);
    const [ loadClass, setLoadClass ] = useState("");

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
        event.preventDefault();
        handleLogon(nameValue, emailValue, passwordValue);
    }

    async function handleLogon(name: string, email: string, password: string) {
        const response = await logon(name, email, password);

        let statusType = "invalid-input";
        let success = false;
        
        clearInputs();

        if (response) {
            if (response.validInput){
                if (response.userExists) {
                    console.log('aq')
                    statusType = "invalid-user";
                }
                else {
                    statusType = "logon-success";
                    success = true;
                    setLogonSucessState(true);
                }
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