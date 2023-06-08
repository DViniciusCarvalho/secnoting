import React from "react";
import DeletedLightTheme from "../../../assets/garbage_light_theme.png";
import DeletedDarkTheme from "../../../assets/garbage_dark_theme.png";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";


export default function DeletedButton({ changedScreen, theme }: Props.DeletedButtonProps){

    const deletedIconCurrentTheme = (theme === "dark")? DeletedDarkTheme : DeletedLightTheme;
    
    function handleChangeToDeletedScreen(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
        const unknownType = event as unknown;
        const eventMouseEvent = unknownType as MouseEvent;
        changedScreen(eventMouseEvent);
    }

    return (
        <li 
          className={`${style.menu__item} ${style[theme]}`} 
          id="deleted" 
          onClick={(event) => handleChangeToDeletedScreen(event)}
        >
            <img 
              src={deletedIconCurrentTheme} 
              alt="garbage icon" 
              className={style.menu__item__icon}
            /> Deleted
        </li>
    );
}