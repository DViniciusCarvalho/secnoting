import React, { useContext, useEffect, useState } from "react";
import style from "../../../styles/internal/main/Main.module.css";
import AddButtonDarkTheme from "../../../assets/add_dark_theme.png";
import AddButtonLightTheme from "../../../assets/add_light_theme.png";

import { Data } from "../../../types/data";
import { Props } from "../../../types/props";

import Annotation from "./Annotation";
import { Navigate } from "react-router-dom";
import { createAnnotation } from "../../../actions/annotation/addAnnotation";
import { InternalPageContext } from "../InternalPage";
import { delay } from "../../../lib/utils";


export default function Folder({ theme, table }: Props.FolderProps){

    const [ elements, setElements ] = useState<JSX.Element[]>([]);
    const [ canRender, setcanRender ] = useState<boolean>(false);
    const [ isAuthorized, setAuthorization ] = useState<boolean>(true);

    const addIcon = (theme === "dark")? AddButtonDarkTheme : AddButtonLightTheme;
    
    let alreadyReloaded = false;

    useEffect(() => {
        if (!alreadyReloaded){
            organizeAnnotationsListInAComponent(table);
        }
        alreadyReloaded = true;
    }, []);

    /*
     * Getting and organizing all the annotations that belongs to the Folder component
     */

    async function updateFolderElementsInDOM(id: number, timestamp: number) {
        console.log(id)
        // setElements(previous => []);
        await delay(3000);
        console.log(table)
        const deepCopyTable: Data.Annotation[] = JSON.parse(JSON.stringify(table));
        const targetElement = deepCopyTable.filter(annotation => annotation.id === id)[0];
        targetElement.timestamp = timestamp;
        console.log(deepCopyTable)
        // organizeAnnotationsListInAComponent(deepCopyTable);
    }

    function organizeAnnotationsListInAComponent(table: Data.Row[]): void {
        setcanRender(false);

        const annotListOrderedByTimestamp = table.sort(
            (a: Data.Row, b: Data.Row) => { 
                return b["timestamp"] - a["timestamp"] 
            }
        );

        for (let annotation of annotListOrderedByTimestamp){
            const annotationId = annotation["id"];
            const annotationTitle = annotation["title"];
            const annotationContent = annotation["content"];
            const annotationTimestamp = annotation["timestamp"];

            addFetchedAnnotationsToDOM({ 
                id: annotationId, 
                title: annotationTitle, 
                content: annotationContent, 
                timestamp: annotationTimestamp 
            });
        }

        setcanRender(true);
    }

    function addFetchedAnnotationsToDOM({ 
        id, 
        title, 
        content, 
        timestamp 
    }: Data.Annotation): void {

        const idPropertyNameInDOM = `folder_${id}`;

        const newAnnotationPropertys: Props.AnnotationProps = {
            title: title,
            content: content,
            id: idPropertyNameInDOM,
            timestamp: timestamp,
            alterDOMAction: updateFolderElementsInDOM
        };

        const oldElements = elements;
        const newElement = <Annotation { ...newAnnotationPropertys }/>;
        oldElements.push(newElement);

        setElements(oldElements);

    }

    /*
     * Creating annotation functionality
     */

    async function handleCreateAnnotation(): Promise<void> { 
        setcanRender(false);
        const response = await createAnnotation();

        if(response.authorized){
            addNewAnnotationToDOM(response.annotationInfo);
            setcanRender(true);
            setAuthorization(true);
        }
        else {
            setAuthorization(false);
        } 
    }

    function addNewAnnotationToDOM({ 
        id, 
        title, 
        content, 
        timestamp
    }: Data.Annotation): void {

        const idPropertyNameInDOM = `folder_${id}`;

        const newAnnotationPropertys: Props.AnnotationProps = {
            title: title,
            content: content,
            id: idPropertyNameInDOM,
            timestamp: timestamp,
            alterDOMAction: updateFolderElementsInDOM
        };

        const oldElements = elements;
        const newElement = <Annotation { ...newAnnotationPropertys }/>;
        oldElements.unshift(newElement);

        setElements(oldElements);

    }
    
    return (
        <section className={style.folder} id="folders">
            <button className={style.add__annotation__button} onClick={handleCreateAnnotation}>               
                <img src={addIcon} alt="sum icon" className={style.add__annotation__icon} />
            </button>
            { canRender && (elements.map((element, index) => (
                <React.Fragment key={index}>
                    {element}
                </React.Fragment>
            )))} 
            { !isAuthorized && ( <Navigate to="/login"/> )}
        </section>
    );
}
