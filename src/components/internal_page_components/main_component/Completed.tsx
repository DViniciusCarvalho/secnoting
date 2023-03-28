import React, { useState, useEffect } from "react";
import style from "./Main_style.module.css";
import { CompletedProps, Row, AnnotationResponse, AnnotationProps } from "../../../interfaces/interfaces";
import Annotation from "./Annotation";

export default function Completed({ table }: CompletedProps){

    const [ elements, setElements ] = useState<JSX.Element[]>([]);

    let alreadyReloaded = false;

    useEffect(() => {
        if (!alreadyReloaded){
            organizeAnnotationsListInAComponent(table);
        }
        alreadyReloaded = true;
    }, [])

    /*
     * Getting and organizing all the annotations that belongs to the Completed component
     */

    function organizeAnnotationsListInAComponent(table: Row[]): void{
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
    }

    function addAnnotationToDOM({ id, title, content, timestamp }: AnnotationResponse): void{
        const idPropertyNameInDOM = `folder_${id}`;
        const newAnnotationPropertys: AnnotationProps = {
            title: title,
            content: content,
            id: idPropertyNameInDOM,
            timestamp: timestamp,
        };
        const newElement = <Annotation { ...newAnnotationPropertys }/>;
        setElements([...elements, newElement]);
    }

    return (
        <section className={style.completed} id="completeds">
            COMPLETED
            { elements.map((element, index) => (
                <React.Fragment key={index}>
                    {element}
                </React.Fragment>
            )) }
        </section>
    );
}