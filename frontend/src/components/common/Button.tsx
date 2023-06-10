import { useState, useEffect } from "react";
import style from "../../styles/common/button/Button.module.css";
import { Props } from "../../types/props";


export default function Button({ message, page, handleSubmitButtonClick }: Props.ButtonProps) {

    const [ pageType, setPageType ] = useState("register");

    useEffect(() => {
        if (page) {
            setPageType("first__page");
        }
    }, []);
    
    return (
        <input type="submit" 
          value={message} 
          className={`${style.button} ${style[pageType]}`}
          onClick={handleSubmitButtonClick} 
          id="register__button"
        />
    );
}