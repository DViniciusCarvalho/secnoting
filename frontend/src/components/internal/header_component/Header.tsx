import style from "../../../styles/internal/header/Header.module.css";
import User from "./User";
import Menu from "./Menu";
import LogOutButton from "./LogOutButton";
import { Props } from "../../../types/props";

export default function header({ name, email, changeTheme, theme, changedScreen }: Props.HeaderProps){
 
    const userProps: Props.UserProps = {
        name: name, 
        email: email, 
        theme: theme
    };

    const menuProps: Props.MenuProps = {
        changedTheme: changeTheme, 
        changedScreen: changedScreen, 
        theme: theme
    };

    const logOutButtonProps: Props.LogOutButtonProps = {
        theme: theme
    };

    return (
        <header className={`${style.header__information} ${style[theme]}`}>
            <User {...userProps}/>
            <Menu {...menuProps}/>
            <LogOutButton {...logOutButtonProps}/>
        </header>
    );
}