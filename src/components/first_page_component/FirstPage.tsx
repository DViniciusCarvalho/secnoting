import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import style from "./FirstPage.module.css";
import NotebookImage from "./first_page_images/notebook.jpg";
import Button from "../common/Button";

export default function FirstPage(){

    const [ canRedirectToLogon, setCanRedirectToLogon ] = useState<boolean>(false);
    const [ canRedirectToLogin, setCanRedirectToLogin ] = useState<boolean>(false);
    const [ loadClass, setLoadClass ] = useState<string>("");

    const goToLoginButtonProps = {
        message: "Sign in",
        page: "first__page",
        handleSubmitButtonClick: handleLoginButtonClick
    };

    const goToLogonButtonProps = {
        message: "Sign up",
        page: "first__page",
        handleSubmitButtonClick: handleLogonButtonClick
    };

    let alreadyLoaded = false;
    
    useEffect(() => {
        if(!alreadyLoaded){
            setLoadClass("loaded");
        }
    }, []);

    function handleLoginButtonClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>){
        setCanRedirectToLogin(true);
    }

    function handleLogonButtonClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>){
        setCanRedirectToLogon(true);
    }

    return (
        <div className={`${style.firstpage__background} ${style[loadClass]}`}>
            <div className={style.container}>
               <img src={NotebookImage} alt="notebook image" className={style.notebook__image}/>
               <div className={style.main__content}>
                    <h1 className={style.main__title}> Hey, welcome to SecNoting!</h1>
                    <p className={style.title__description}>The safest way to protect your notes </p>
                    <hr className={style.top__separator__line}/>
                    <h2 className={style.join__us__message}> Join Us </h2>
                    <Button {...goToLoginButtonProps}/>
                    <Button {...goToLogonButtonProps}/>
               </div>
            </div>
            { canRedirectToLogon && ( <Navigate to="/logon"/>)}
            { canRedirectToLogin && ( <Navigate to="/login"/>)}
        </div>
    );
}