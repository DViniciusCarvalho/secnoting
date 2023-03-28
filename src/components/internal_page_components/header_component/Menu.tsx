import React from "react";
import FolderButton from "./FolderButton";
import CompletedButton from "./CompletedButton";
import ThemeButton from "./ThemeButton";
import DeletedButton from "./DeletedButton";
import style from "./Header_style.module.css";
import { MenuProps } from "../../../interfaces/interfaces";

export default function Menu({ changedTheme, changedScreen, theme }: MenuProps){

    let folderProps = {changedScreen: changedScreen, theme: theme};
    let completedProps = {changedScreen: changedScreen, theme: theme};
    let themeProps = {changedTheme: changedTheme, theme: theme};
    let deletedProps = {changedScreen: changedScreen, theme: theme};
     
    return (
        <nav className={style.menu__navigation}>
            <ul className={style.menu__items} id="menu__items">
                <FolderButton {...folderProps}/>
                <CompletedButton {...completedProps}/>
                <ThemeButton {...themeProps}/>
                <DeletedButton {...deletedProps}/>           
            </ul>
        </nav>
    );
}