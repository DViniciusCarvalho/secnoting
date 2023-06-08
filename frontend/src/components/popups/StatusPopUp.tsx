import style from "../../styles/popups/StatusPopUp.module.css";
import { Props } from "../../types/props";
import ErrorIcon from "../../assets/warning.png";
import SuccessIcon from "../../assets/successful.png";
 

export default function PopUp({ content, visibilityClass, status }: Props.PopUpProps) {

    const popUpMessages: {[key: string]: string} = { 
        "invalid-login": "Invalid credentials, password or e-mail incorrect.",
        "invalid-input": "Invalid credentials, don't use HTML tags and follow the pattern.",
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
