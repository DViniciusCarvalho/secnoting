import React, { useState, useEffect } from "react";
import style from "../../../styles/internal/main/Main.module.css";
import { Data } from "../../../types/data";
import { Props } from "../../../types/props";
import Annotation from "./Annotation";


export default function Completed({ table }: Props.CompletedProps){

    const [ elements, setElements ] = useState<JSX.Element[]>([]);

    let alreadyReloaded = false;

    useEffect(() => {
        if (!alreadyReloaded){
            organizeAnnotationsListInAComponent(table);
        }
        alreadyReloaded = true;
    }, [])

    function updateCompletedElementsInDOM() {
        setElements(previous => []);
        organizeAnnotationsListInAComponent(table);
    }

    /*
     * Getting and organizing all the annotations that belongs to the Completed component
     */

    function organizeAnnotationsListInAComponent(table: Data.Row[]): void {

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
    }

    function addAnnotationToDOM({ 
        id, 
        title, 
        content, 
        timestamp 
    }: Data.Annotation): void {

        const idPropertyNameInDOM = `completed_${id}`;

        const newAnnotationPropertys: Props.AnnotationProps = {
            title: title,
            content: content,
            id: idPropertyNameInDOM,
            timestamp: timestamp,
            alterDOMAction: updateCompletedElementsInDOM
        };

        const newElement = <Annotation { ...newAnnotationPropertys }/>;
        setElements([...elements, newElement]);

    }

    return (
        <section className={style.completed} id="completeds">
            { elements.map((element, index) => (
                <React.Fragment key={index}>
                    {element}
                </React.Fragment>
            )) }
        </section>
    );
}