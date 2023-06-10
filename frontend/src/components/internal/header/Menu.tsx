import FolderButton from "./FolderButton";
import CompletedButton from "./CompletedButton";
import ThemeButton from "./ThemeButton";
import DeletedButton from "./DeletedButton";
import style from "../../../styles/internal/header/Header.module.css";
import { Props } from "../../../types/props";


export default function Menu({ changeTheme, changeCurrentSection, theme }: Props.MenuProps) {

    const folderProps: Props.FolderButtonProps = {
        changeCurrentSectionToFolder: changeCurrentSection, 
        theme: theme
    };

    const completedProps: Props.CompletedButtonProps = {
        changeCurrentSectionToCompleted: changeCurrentSection, 
        theme: theme
    };

    const themeProps: Props.ThemeButtonProps = {
        changeTheme: changeTheme, 
        theme: theme
    };

    const deletedProps: Props.DeletedButtonProps = {
        changeCurrentSectionToDeleted: changeCurrentSection, 
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