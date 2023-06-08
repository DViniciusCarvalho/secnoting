import UserPhotoLightTheme from "../../../assets/user_light_theme.png";
import UserPhotoDarkTheme from "../../../assets/user_dark_theme.png";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";


export default function User({ theme, name, email }: Props.UserProps){  

    const userPhotoCurrentTheme = (theme === "dark")? UserPhotoDarkTheme : UserPhotoLightTheme;

    return (
        <div className={style.user__information}>
            <div className={style.user__photo}>
                <img src={userPhotoCurrentTheme} alt="user profile image"/>
            </div>
            <div className={style.user__account}>
                <p className={`${style.user__name} ${style[theme]}`}> {name} </p>
                <p className={`${style.user__email} ${style[theme]}`}> {email} </p>
            </div>
        </div>
    );
}