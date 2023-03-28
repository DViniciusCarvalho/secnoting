import React from "react";
import FolderLightTheme from "./header_images/folder_light_theme.png";
import FolderDarkTheme from "./header_images/folder_dark_theme.png";
import style from "./Header_style.module.css";
import { FolderButtonProps } from "../../../interfaces/interfaces";

export default function FolderButton({ changedScreen, theme }: FolderButtonProps){

    function handleChangeToFolderScreen(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
        const unknownType = event as unknown;
        const eventMouseEvent = unknownType as MouseEvent;
        changedScreen(eventMouseEvent);
    }

    let folderIconCurrentTheme = (theme === "dark")? FolderDarkTheme : FolderLightTheme;

    return (
        <li className={`${style.menu__item} ${style[theme]}`} id="folder" 
        onClick={(event) => handleChangeToFolderScreen(event)}>
            <img src={folderIconCurrentTheme} alt="folder image" className={style.menu__item__icon}/>Folders
        </li>
    );  
}