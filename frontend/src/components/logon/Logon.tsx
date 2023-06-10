import React, { useEffect, useRef, useState, FormEvent } from "react";
import style from "../../styles/logon/Logon.module.css";
import PasswordEyeOpenned from "../../assets/open_eye.png";
import PasswordEyeClosed from "../../assets/closed_eye.png";
import { Props } from "../../types/props";
import { Navigate } from "react-router-dom";
import StatusPopUp from "../popups/StatusPopUp";
import { delay } from "../../lib/utils";
import Button from "../common/Button";
import { logon } from "../../actions/logon";


export default function LogonComponent(){
    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [ passwordIsHide, setPasswordIsHide ] = useState(true);
    const [ popUpVisibility, setPopUpVisibility ] = useState("invisible");
    const [ didLogonWithSucess, setLogonSucessState ] = useState(false);
    const [ loadClass, setLoadClass ] = useState("");
    const [ statusPopUpData, setStatusPopUpData ] = useState({ 
        content: "invalidInput",  
        status: "error" 
    });

    const logonButtonProps: Props.ButtonProps = {
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

    
    function changePsswdVisibility(): void {  
        setPasswordIsHide(passwordIsHide => !passwordIsHide);  
    }


    function handleSubmitButtonClick(): void {
        const nameElement = nameRef.current! as HTMLInputElement;
        const emailElement = emailRef.current! as HTMLInputElement;
        const passwordElement = passwordRef.current! as HTMLInputElement;

        const nameValue = nameElement.value;
        const emailValue = emailElement.value;
        const passwordValue = passwordElement.value;

        handleLogon(nameValue, emailValue, passwordValue);
    }


    async function handleLogon(name: string, email: string, password: string): Promise<void> {
        const response = await logon(name, email, password);

        let statusType = "invalidInput";
        let success = false;
        
        clearInputs();

        if (response) {
            if (response.validInput){
                if (response.userExists) {
                    statusType = "invalidUser";
                }
                else {
                    statusType = "logonSuccess";
                    success = true;
                    setLogonSucessState(true);
                }
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
        const nameElement = nameRef.current! as HTMLInputElement;
        const emailElement = emailRef.current! as HTMLInputElement;
        const passwordElement = passwordRef.current! as HTMLInputElement;

        nameElement.value = "";
        emailElement.value = "";
        passwordElement.value = "";
    }


    return (
        <div className={`${style.form__background} ${style[loadClass]}`}>
            <StatusPopUp {...statusPopUpData} visibilityClass={popUpVisibility}/>
            <div className = { style.form__block }>
                <form 
                  className={style.form__field} 
                  method="post" 
                  autoComplete="off"
                  onSubmit={(event) => event.preventDefault()}
                >
                    <h1 className={style.logon__message}>Sign up</h1>
                    <p className={style.welcome__message}>Welcome to SecNoting!</p>
                    <hr className={style.separation__line}/>
                    <div className={style.name__block}>
                        <label 
                          htmlFor="name__input__logon" 
                          className={style.data__label}
                        > 
                            Name: 
                        </label>
                        <input 
                          type="text" 
                          name="name" 
                          id="name__input__logon" 
                          className={style.name__input} 
                          ref={nameRef} 
                          required={true}
                        />
                    </div>
                    <div className={style.email__block}>
                        <label 
                          htmlFor="email__input" 
                          className={style.data__label}
                        > 
                            E-mail: 
                        </label>
                        <input 
                          type="email" 
                          name="email" 
                          id="email__input__logon" 
                          className={style.email__input} 
                          ref={emailRef} 
                          required={true}
                        />
                    </div>
                    <div className={style.password__block}>
                        <label 
                          htmlFor="password__input" 
                          className={style.data__label}
                        > 
                            Password: 
                        </label>
                        <div className={style.password__area}>
                            <input 
                              type={passwordIsHide? "password" : "text"} 
                              id="password__input__logon" 
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
                    <Button {...logonButtonProps}/>   
                    <p className={style.logon__link}> 
                        Already have an account? <a href="/login">Sign in</a>
                    </p>
                </form>
            </div>
            { didLogonWithSucess && (<Navigate to="/login"/>) }
        </div>      
    );
};