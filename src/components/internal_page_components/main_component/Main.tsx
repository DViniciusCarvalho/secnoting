import React from "react";
import Folder from "./Folder";
import Completed from "./Completed";
import Deleted from "./Deleted";
import style from "./Main_style.module.css";
import { MainProps, FolderProps, CompletedProps, DeletedProps } from "../../../interfaces/interfaces";
  

export default function Main({ theme, folderVisible, completedVisible, deletedVisible, tables }: MainProps){

    const folderProps: FolderProps = {theme: theme, table: tables["folders"]};
    const completedProps: CompletedProps = {table: tables["completeds"]};
    const deletedProps: DeletedProps = {table: tables["deleteds"]};

    return (
        <main className={`${style.main__content} ${style[theme]}`} id="main_content_reference">
            { folderVisible === "visible" && (<Folder {...folderProps}/>) }
            { completedVisible === "visible" && (<Completed {...completedProps}/>) }
            { deletedVisible === "visible" && (<Deleted {...deletedProps}/>) }
        </main>
    );
}