import React from "react";
import TaskListLightTheme from "./header_images/tasklist_light_theme.png";
import TaskListDarkTheme from "./header_images/tasklist_dark_theme.png";
import style from "./Header_style.module.css";
import { CompletedButtonProps } from "../../../interfaces/interfaces";

export default function CompletedButton({ changedScreen, theme }: CompletedButtonProps){

    let tasklistIconCurrentTheme = (theme === "dark")? TaskListDarkTheme : TaskListLightTheme;
    
    function handleChangeToCompletedScreen(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
        const unknownType = event as unknown;
        const eventMouseEvent = unknownType as MouseEvent;
        changedScreen(eventMouseEvent);
    }

    return (
        <li className={`${style.menu__item} ${style[theme]}`} id="completed" onClick={
            (event) => handleChangeToCompletedScreen(event)}>
            <img src={tasklistIconCurrentTheme} alt="tasklist icon" className={style.menu__item__icon}/>Completed
        </li>
    );
}