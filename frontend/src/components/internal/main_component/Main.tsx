import Folder from "./Folder";
import Completed from "./Completed";
import Deleted from "./Deleted";
import style from "../../../styles/internal/main/Main.module.css";
import { Props } from "../../../types/props";


export default function Main({ 
    theme, 
    folderVisible, 
    completedVisible, 
    deletedVisible, 
    tables 
}: Props.MainProps){

    const folderProps: Props.FolderProps = {
        theme: theme, 
        tables: tables
    };

    const completedProps: Props.CompletedProps = {
        tables: tables
    };

    const deletedProps: Props.DeletedProps = {
        tables: tables
    };

    return (
        <main className={`${style.main__content} ${style[theme]}`} id="main_content_reference">
            { folderVisible === "visible" && (<Folder {...folderProps}/>) }
            { completedVisible === "visible" && (<Completed {...completedProps}/>) }
            { deletedVisible === "visible" && (<Deleted {...deletedProps}/>) }
        </main>
    );
}