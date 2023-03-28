import React, { useContext, useState } from "react";
import LogoutIconLightTheme from "./header_images/logout_light_theme.png";
import LogoutIconDarkTheme from "./header_images/logout_dark_theme.png";
import style from "./Header_style.module.css";
import { LogOutButtonProps } from "../../../interfaces/interfaces";
import { Navigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

export default function LogOutButton({ theme }: LogOutButtonProps){

    let logoutIconCurrentTheme = ( theme === "dark" )? LogoutIconDarkTheme : LogoutIconLightTheme;

    const [ didLogOut, setDidLogOut ] = useState(false);

    function logOutUser(): void{
        localStorage.setItem("token", "");
        googleLogout();
        setDidLogOut(true);
    }

    return (
        <div className={style.logout__icon} onClick={logOutUser}>
            <img src={logoutIconCurrentTheme} alt="logout icon image"/>
            { didLogOut && ( <Navigate to="/login"/>) }
        </div>
    );
}