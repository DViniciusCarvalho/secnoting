import { useState } from "react";
import LogoutIconLightTheme from "../../../assets/logout_light_theme.png";
import LogoutIconDarkTheme from "../../../assets/logout_dark_theme.png";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";
import { Navigate } from "react-router-dom";


export default function LogOutButton({ theme }: Props.LogOutButtonProps) {

    const logoutIconCurrentTheme = (theme === "dark")? LogoutIconDarkTheme : LogoutIconLightTheme;

    const [ didLogOut, setDidLogOut ] = useState(false);

    function logOutUser(): void {
        localStorage.setItem("token", "");
        setDidLogOut(true);
    }

    return (
        <div className={style.logout__icon} onClick={logOutUser}>
            <img src={logoutIconCurrentTheme} alt="logout icon image"/>
            { didLogOut && ( <Navigate to="/login"/>) }
        </div>
    );
}