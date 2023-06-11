import style from "../../styles/popups/StatusPopUp.module.css";
import { Data } from "../../types/data";
import { Props } from "../../types/props";
import ErrorIcon from "../../assets/warning.png";
import SuccessIcon from "../../assets/successful.png";
 

export default function StatusPopUp({ content, visibilityClass, status }: Props.PopUpProps) {

    const popUpMessages: Data.StatusPopUpMessages = { 
        invalidLogin: "Invalid credentials, password or e-mail incorrect.",
        invalidInput: "Invalid credentials, don't use HTML tags and follow the pattern.",
        invalidUser: "E-mail already used. Please, try to use another one.",
        logonSuccess: "Registered with success.",
        anErrorOccurred: "An error occurred. Please, try again later."
    }; 

    return (
        <div className={`${style.pop__up__box} ${style[visibilityClass]} ${style[status]}`}>
            <img 
              src={(status === "error")? ErrorIcon : SuccessIcon} 
              alt="status icon" 
              className={style.status__icon}
            />
            <p>
                {popUpMessages[content]}
            </p>
        </div>
    );
}