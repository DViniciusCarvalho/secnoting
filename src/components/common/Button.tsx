import { useState, useEffect } from "react";
import style from "./Button.module.css";
import { ButtonProperties } from "../../interfaces/interfaces";

export default function Button({ message, page, handleSubmitButtonClick }: ButtonProperties){

    const [ pageType, setPageType ] = useState<string>("register");

    useEffect(() => {
        if(page){
            setPageType("first__page");
        }
    }, []);
    
    return (
        <input type="submit" value={message} className={`${style.button} ${style[pageType]}`}
        onClick={(event) => handleSubmitButtonClick(event)} id="register__button"/>
    );
}