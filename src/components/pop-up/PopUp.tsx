import React from "react";
import style from "./PopUp.module.css";
import { PopUpProps } from "../../interfaces/interfaces";
import ErrorIcon from "./popup-images/warning.png";
import SuccessIcon from "./popup-images/successful.png";
 

export default function PopUp({ content, visibilityClass, status }: PopUpProps) {

    const popUpMessages: {[key: string]: string} = { 
        "invalid-login": "Invalid credentials, password or e-mail incorrect.",
        "invalid-input": "Invalid credentials, don't use HTML tags.",
        "invalid-user": "E-mail already used. Please, try to use another one.",
        "logon-sucess": "Registered with success."
    }; 

    return (
        <div className={`${style.pop__up__box} ${style[visibilityClass]} ${style[status]}`}>
            <img src={ status === "error"? ErrorIcon : SuccessIcon } alt="status icon" className={style.status__icon}/>
            <p> { popUpMessages[content] } </p>
        </div>
    );
}
