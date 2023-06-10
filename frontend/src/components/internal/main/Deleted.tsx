import React from "react";
import style from "../../../styles/internal/main/Main.module.css";

import { Data } from "../../../types/data";
import { Props } from "../../../types/props";

import Annotation from "./Annotation";
import { sortAnnotationsByDescendantTimestamp } from "../../../lib/utils";


export default function Deleted({ tables }: Props.DeletedProps) {

    function mountDeletedAnnotation (annotation: Data.Annotation): JSX.Element {
        const DOMidentifier = `deleted_${annotation.id}`;

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
        <section className={style.deleted} id="deleteds">

            { sortAnnotationsByDescendantTimestamp(tables.deleteds).map(annotation => (
                mountDeletedAnnotation(annotation)
            ))} 

        </section>
    );
}