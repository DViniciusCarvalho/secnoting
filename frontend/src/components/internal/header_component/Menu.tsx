import FolderButton from "./FolderButton";
import CompletedButton from "./CompletedButton";
import ThemeButton from "./ThemeButton";
import DeletedButton from "./DeletedButton";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";


export default function Menu({ changedTheme, changedScreen, theme }: Props.MenuProps){

    const folderProps: Props.FolderButtonProps = {
        changedScreen: changedScreen, 
        theme: theme
    };

    const completedProps: Props.CompletedButtonProps = {
        changedScreen: changedScreen, 
        theme: theme
    };

    const themeProps: Props.ThemeButtonProps = {
        changedTheme: changedTheme, 
        theme: theme
    };

    const deletedProps: Props.DeletedButtonProps = {
        changedScreen: changedScreen, 
        theme: theme
    };
     
    return (
        <nav className={style.menu__navigation}>
            <ul className={style.menu__items} id="menu__items">
                <FolderButton {...folderProps}/>
                <CompletedButton {...completedProps}/>
                <ThemeButton {...themeProps}/>
                <DeletedButton {...deletedProps}/>           
            </ul>
        </nav>
    );
}