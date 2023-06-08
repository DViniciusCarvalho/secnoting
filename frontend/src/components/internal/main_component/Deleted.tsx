import React, { useEffect, useState } from "react";
import style from "../../../styles/internal/main/Main.module.css";

import { Data } from "../../../types/data";
import { Props } from "../../../types/props";

import Annotation from "./Annotation";
import { Navigate } from "react-router-dom";


export default function Deleted({ table }: Props.DeletedProps){

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

    function updateDeletedElementsInDOM() {
        setElements(previous => []);
        organizeAnnotationsListInAComponent(table);
    }

    /*
     * Getting and organizing all the annotations that belongs to the Deleted component
     */ 

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

            addAnnotationToDOM({ 
                id: annotationId, 
                title: annotationTitle, 
                content: annotationContent, 
                timestamp: annotationTimestamp 
            });
        }

        setcanRender(true);
    }

    function addAnnotationToDOM({ 
        id, 
        title, 
        content, 
        timestamp 
    }: Data.Annotation): void{

        const idPropertyNameInDOM = `deleted_${id}`;

        const newAnnotationPropertys: Props.AnnotationProps = {
            title: title,
            content: content,
            id: idPropertyNameInDOM,
            timestamp: timestamp,
            alterDOMAction: updateDeletedElementsInDOM
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