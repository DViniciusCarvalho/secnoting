import React, { useEffect, useState } from "react";
import style from "./Main_style.module.css";
import { DeletedProps, Row, AnnotationResponse, AnnotationProps } from "../../../interfaces/interfaces";
import Annotation from "./Annotation";
import { Navigate } from "react-router-dom";

export default function Deleted({ table }: DeletedProps){

    const [ elements, setElements ] = useState<JSX.Element[]>([]);
    const [ isAuthorized, setAuthorization ] = useState<boolean>(true);
    const [ canRender, setcanRender ] = useState<boolean>(false);

    let alreadyReloaded = false;

    useEffect(() => {
        if (!alreadyReloaded){
            organizeAnnotationsListInAComponent(table);
        }
        alreadyReloaded = true;
    }, [])

    /*
     * Getting and organizing all the annotations that belongs to the Deleted component
     */ 

    function organizeAnnotationsListInAComponent(table: Row[]): void{
        setcanRender(false);
        let annotListOrderedByTimestamp = table.sort((a: Row, b: Row) => { return b["timestamp"] - a["timestamp"] });
        for (let annotation of annotListOrderedByTimestamp){
            const annotationId = annotation["id"];
            const annotationTitle = annotation["title"];
            const annotationContent = annotation["content"];
            const annotationTimestamp = annotation["timestamp"];

            addAnnotationToDOM({ 
                id: annotationId, 
                title: annotationTitle, 
                content: annotationContent, 
                timestamp: annotationTimestamp 
            });
        }
        setcanRender(true);
    }

    function addAnnotationToDOM({ id, title, content, timestamp }: AnnotationResponse): void{
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

    return (
        <section className={style.deleted} id="deleteds">
            { canRender && (elements.map((element, index) => (
                <React.Fragment key={index}>
                    {element}
                </React.Fragment>
            )))} 
            { !isAuthorized && ( <Navigate to="/login"/> )}
        </section>
    );
}