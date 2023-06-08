import React from "react";
import FolderLightTheme from "../../../assets/folder_light_theme.png";
import FolderDarkTheme from "../../../assets/folder_dark_theme.png";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";


export default function FolderButton({ changedScreen, theme }: Props.FolderButtonProps){

    const folderIconCurrentTheme = (theme === "dark")? FolderDarkTheme : FolderLightTheme;

    function handleChangeToFolderScreen(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
        const unknownType = event as unknown;
        const eventMouseEvent = unknownType as MouseEvent;
        changedScreen(eventMouseEvent);
    }

    return (
        <li 
          className={`${style.menu__item} ${style[theme]}`} 
          id="folder" 
          onClick={(event) => handleChangeToFolderScreen(event)}
        >
            <img 
              src={folderIconCurrentTheme} 
              alt="folder image" 
              className={style.menu__item__icon}
            /> Folders
        </li>
    );  
}