import ThemeIconLightTheme from "../../../assets/icontheme_light_theme.png";
import ThemeIconDarkTheme from "../../../assets/icontheme_dark_theme.png";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";
  

export default function ThemeButton({ changedTheme, theme }: Props.ThemeButtonProps){

    const themeIconCurrentTheme = (theme === "dark")? ThemeIconDarkTheme : ThemeIconLightTheme;
    
    return (
        <li 
          className={`${ style.menu__item} ${style[theme] }`} 
          id="t_button"
          onClick={changedTheme} 
        >
            <img 
              src={themeIconCurrentTheme} 
              alt="theme icon" 
              className={style.menu__item__icon}
            /> Mode: {theme}
        </li>
    );
}