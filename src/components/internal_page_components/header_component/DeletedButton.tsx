import React from "react";
import DeletedLightTheme from "./header_images/garbage_light_theme.png";
import DeletedDarkTheme from "./header_images/garbage_dark_theme.png";
import style from "./Header_style.module.css";
import { DeletedButtonProps } from "../../../interfaces/interfaces";

export default function DeletedButton({ changedScreen, theme }: DeletedButtonProps){

    let deletedIconCurrentTheme = (theme === "dark")? DeletedDarkTheme : DeletedLightTheme;
    
    function handleChangeToDeletedScreen(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
        const unknownType = event as unknown;
        const eventMouseEvent = unknownType as MouseEvent;
        changedScreen(eventMouseEvent);
    }

    return (
        <li className={`${style.menu__item} ${style[theme]}`} id="deleted" 
        onClick={(event) => handleChangeToDeletedScreen(event)}>
            <img src={deletedIconCurrentTheme} alt="garbage icon" 
            className={style.menu__item__icon}/> Deleted
        </li>
    );
}