import React from "react";
import style from "./Header_style.module.css";
import User from "./User";
import Menu from "./Menu";
import LogOutButton from "./LogOutButton";
import { HeaderProps } from "../../../interfaces/interfaces";

export default function header({ name, email, changeTheme, theme, changedScreen }: HeaderProps){
 
    let userProps = {name: name, email: email, theme: theme};
    let menuProps = {changedTheme: changeTheme, changedScreen: changedScreen, theme: theme};
    let logOutButtonProps = {theme: theme};

    return (
        <header className={`${style.header__information} ${style[theme]}`}>
            <User {...userProps}/>
            <Menu {...menuProps}/>
            <LogOutButton {...logOutButtonProps}/>
        </header>
    );
}