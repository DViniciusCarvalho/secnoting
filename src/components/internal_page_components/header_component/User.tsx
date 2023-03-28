import React from "react";
import UserPhotoLightTheme from "./header_images/user_light_theme.png";
import UserPhotoDarkTheme from "./header_images/user_dark_theme.png";
import style from "./Header_style.module.css";
import { UserProps } from "../../../interfaces/interfaces";

export default function User({ theme, name, email }: UserProps){  

    let userPhotoCurrentTheme = (theme === "dark")? UserPhotoDarkTheme : UserPhotoLightTheme;

    return (
        <div className={style.user__information}>
            <div className={style.user__photo}>
                <img src={userPhotoCurrentTheme} alt="user profile image"/>
            </div>
            <div className={style.user__account}>
                <p className={`${style.user__name} ${style[theme]}`}> {name} </p>
                <p className={`${style.user__email} ${style[theme]}`}> {email} </p>
            </div>
        </div>
    );
}