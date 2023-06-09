import React, { useState } from "react";
import style from "../../../styles/internal/main/Main.module.css";

import { Data } from "../../../types/data";
import { Props } from "../../../types/props";

import Annotation from "./Annotation";
import { Navigate } from "react-router-dom";


export default function Deleted({ tables }: Props.DeletedProps){

    const [ isAuthorized, setAuthorization ] = useState(true);

    function sortAnnotationsByDescendantTimestamp(annotations: Data.Annotation[]): Data.Annotation[] {
        return annotations.sort((a: Data.Annotation, b: Data.Annotation) => {
            return b.timestamp - a.timestamp;
        })
    }

    function mountDeletedAnnotation (annotation: Data.Annotation): JSX.Element {
        const DOMidentifier = `deleted_${annotation.id}`;

        const annotationProps: Props.AnnotationProps = {
            id: DOMidentifier,
            title: annotation.title,
            content: annotation.content,
            timestamp: annotation.timestamp
        };

        const JSXAnnotationElement = <Annotation key={DOMidentifier} {...annotationProps}/>;
        console.log(JSXAnnotationElement)

        return JSXAnnotationElement;
    }

    return (
        <section className={style.deleted} id="deleteds">

            { sortAnnotationsByDescendantTimestamp(tables.deleteds).map((annotation, index) => (
                mountDeletedAnnotation(annotation)
            ))} 

            { !isAuthorized && ( <Navigate to="/login"/> )}
        </section>
    );
}