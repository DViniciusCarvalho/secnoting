import React from "react";
import ThemeIconLightTheme from "./header_images/icontheme_light_theme.png";
import ThemeIconDarkTheme from "./header_images/icontheme_dark_theme.png";
import style from "./Header_style.module.css";
import { ThemeButtonProps } from "../../../interfaces/interfaces";
  
export default function ThemeButton({ changedTheme, theme }: ThemeButtonProps){

    let themeIconCurrentTheme = (theme === "dark")? ThemeIconDarkTheme : ThemeIconLightTheme;
    
    return (
        <li className={`${ style.menu__item} ${style[theme] }`} onClick={changedTheme} id="t_button">
            <img src={themeIconCurrentTheme} alt="theme icon" className={style.menu__item__icon}/>
            Mode: {theme}
        </li>
    );
}