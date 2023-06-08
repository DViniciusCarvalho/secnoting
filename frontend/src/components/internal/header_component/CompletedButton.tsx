import React from "react";
import TaskListLightTheme from "../../../assets/tasklist_light_theme.png";
import TaskListDarkTheme from "../../../assets/tasklist_dark_theme.png";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";


export default function CompletedButton({ changedScreen, theme }: Props.CompletedButtonProps){

    const tasklistIconCurrentTheme = (theme === "dark")? TaskListDarkTheme : TaskListLightTheme;
    
    function handleChangeToCompletedScreen(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
        const unknownType = event as unknown;
        const eventMouseEvent = unknownType as MouseEvent;
        changedScreen(eventMouseEvent);
    }

    return (
        <li 
          className={`${style.menu__item} ${style[theme]}`} 
          id="completed" 
          onClick={(event) => handleChangeToCompletedScreen(event)}
        >
            <img 
              src={tasklistIconCurrentTheme} 
              alt="tasklist icon" 
              className={style.menu__item__icon}
            /> Completed
        </li>
    );
}