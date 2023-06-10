import ThemeIconLightTheme from "../../../assets/icontheme_light_theme.png";
import ThemeIconDarkTheme from "../../../assets/icontheme_dark_theme.png";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";
  

export default function ThemeButton({ changeTheme, theme }: Props.ThemeButtonProps) {

    const themeIconCurrentTheme = (theme === "dark")? ThemeIconDarkTheme : ThemeIconLightTheme;
    
    return (
        <li 
          className={`${ style.menu__item} ${style[theme] }`} 
          id="t_button"
          onClick={changeTheme} 
        >
            <img 
              src={themeIconCurrentTheme} 
              alt="theme icon" 
              className={style.menu__item__icon}
            /> Mode: {theme}
        </li>
    );
}