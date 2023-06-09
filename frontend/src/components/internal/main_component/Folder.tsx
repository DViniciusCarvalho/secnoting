import React, { useContext, useState } from "react";
import style from "../../../styles/internal/main/Main.module.css";
import AddButtonDarkTheme from "../../../assets/add_dark_theme.png";
import AddButtonLightTheme from "../../../assets/add_light_theme.png";

import { Data } from "../../../types/data";
import { Props } from "../../../types/props";

import Annotation from "./Annotation";
import { Navigate } from "react-router-dom";
import { createAnnotation } from "../../../actions/annotation/addAnnotation";
import { InternalPageContext } from "../InternalPage";


export default function Folder({ theme, tables }: Props.FolderProps){

    const { addNewAnnotationToTablesObject } = useContext(InternalPageContext)!;

    const [ isAuthorized, setAuthorization ] = useState(true);

    const addIcon = (theme === "dark")? AddButtonDarkTheme : AddButtonLightTheme;

    async function handleCreateAnnotation(): Promise<void> { 
        const response = await createAnnotation();

        if (response.authorized) {
            addNewAnnotationToTablesObject(
                response.annotationInfo.id, 
                response.annotationInfo.title, 
                response.annotationInfo.content, 
                response.annotationInfo.timestamp
            );
            setAuthorization(true);
        }
        else {
            setAuthorization(false);
        } 
    }

    function sortAnnotationsByDescendantTimestamp(annotations: Data.Annotation[]): Data.Annotation[] {
        return annotations.sort((a: Data.Annotation, b: Data.Annotation) => {
            return b.timestamp - a.timestamp;
        });
    }

    function mountFolderAnnotation (annotation: Data.Annotation): JSX.Element {
        const DOMidentifier = `folder_${annotation.id}`;

        const annotationProps: Props.AnnotationProps = {
            id: DOMidentifier,
            title: annotation.title,
            content: annotation.content,
            timestamp: annotation.timestamp
        };

        const JSXAnnotationElement = <Annotation key={DOMidentifier} {...annotationProps}/>;

        return JSXAnnotationElement;
    }
    
    return (
        <section className={style.folder} id="folders">
            <button 
              className={style.add__annotation__button} 
              onClick={handleCreateAnnotation}
            >               
                <img src={addIcon} alt="sum icon" className={style.add__annotation__icon}/>
            </button>

            { sortAnnotationsByDescendantTimestamp(tables.folders).map((annotation, index) => (
                mountFolderAnnotation(annotation)
            ))} 

            { !isAuthorized && ( <Navigate to="/login"/> )}
        </section>
    );
}