import React, { useEffect, useState } from "react";
import style from "./Main_style.module.css";
import AddButtonDarkTheme from "./main_images/add_dark_theme.png";
import AddButtonLightTheme from "./main_images/add_light_theme.png";
import { FolderProps, Row, AnnotationResponse, AnnotationProps } from "../../../interfaces/interfaces";
import { CreateAnnotationRequestParameters } from "../../../interfaces/interfaces";
import Annotation from "./Annotation";
import { Navigate } from "react-router-dom";

export default function Folder({ theme, table }: FolderProps){

    const [ elements, setElements ] = useState<JSX.Element[]>([]);
    const [ canRender, setcanRender ] = useState<boolean>(false);
    const [ isAuthorized, setAuthorization ] = useState<boolean>(true);

    let addIcon = (theme === "dark")? AddButtonDarkTheme : AddButtonLightTheme;
    let alreadyReloaded = false;

    useEffect(() => {
        if (!alreadyReloaded){
            organizeAnnotationsListInAComponent(table);
        }
        alreadyReloaded = true;
    }, [])

    /*
     * Getting and organizing all the annotations that belongs to the Folder component
     */

    function organizeAnnotationsListInAComponent(table: Row[]): void{
        setcanRender(false);
        const annotListOrderedByTimestamp = table.sort((a: Row, b: Row) => { return b["timestamp"] - a["timestamp"] });
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

    function addFetchedAnnotationsToDOM({ id, title, content, timestamp }: AnnotationResponse): void{
        const idPropertyNameInDOM = `folder_${id}`;
        const newAnnotationPropertys: AnnotationProps = {
            title: title,
            content: content,
            id: idPropertyNameInDOM,
            timestamp: timestamp,
        };
        const oldElements = elements;
        const newElement = <Annotation { ...newAnnotationPropertys }/>;
        oldElements.push(newElement);
        setElements(oldElements);
    }

    /*
     * Creating annotation functionality
     */

    function createAnnotation(): void{ 
        setcanRender(false);
        let requestConfig = arrangeAnnotationRequest();
        doAnnotationRequest(requestConfig);
    }

    function arrangeAnnotationRequest(): CreateAnnotationRequestParameters{
        const userToken: {[token: string]: string} = {token: localStorage.getItem("token") ?? ""};
        const createAnnotationRequestParameters: CreateAnnotationRequestParameters = {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(userToken)
        };
        return createAnnotationRequestParameters;
    }

    async function doAnnotationRequest(requestConfig: CreateAnnotationRequestParameters){
        let response = await fetch("http://localhost:3001/add-annotation", requestConfig);
        let responseStringfied = await response.json();
        let responseObject = JSON.parse(responseStringfied);
        if(responseObject["authorized"]){
            addNewAnnotationToDOM(responseObject["annotation_info"]);
            setcanRender(true);
            setAuthorization(true);
        }
        else {
            setAuthorization(false);
        }       
    }

    function addNewAnnotationToDOM({ id, title, content, timestamp}: AnnotationResponse): void{
        const idPropertyNameInDOM = `folder_${id}`;
        const newAnnotationPropertys: AnnotationProps = {
            title: title,
            content: content,
            id: idPropertyNameInDOM,
            timestamp: timestamp,
        };
        const oldElements = elements;
        const newElement = <Annotation { ...newAnnotationPropertys }/>;
        oldElements.unshift(newElement);
        setElements(oldElements);
    }
    
    return (
        <section className={style.folder} id="folders">
            <button className={style.add__annotation__button} onClick={createAnnotation}>               
                <img src={addIcon} alt="sum icon" className={style.add__annotation__icon} />
            </button>
            { canRender && (elements.map((element) => (
                <React.Fragment key={Date.now()}>
                    {element}
                </React.Fragment>
            )))} 
            { !isAuthorized && ( <Navigate to="/login"/> )}
        </section>
    );
}
