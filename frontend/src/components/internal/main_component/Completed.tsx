import React from "react";
import style from "../../../styles/internal/main/Main.module.css";
import { Data } from "../../../types/data";
import { Props } from "../../../types/props";
import Annotation from "./Annotation";


export default function Completed({ tables }: Props.CompletedProps) {

    function sortAnnotationsByDescendantTimestamp(annotations: Data.Annotation[]): Data.Annotation[] {
        return annotations.sort((a: Data.Annotation, b: Data.Annotation) => {
            return b.timestamp - a.timestamp;
        })
    }

    function mountCompletedAnnotation (annotation: Data.Annotation): JSX.Element {
        const DOMidentifier = `completed_${annotation.id}`;

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
        <section className={style.completed} id="completeds">

            { sortAnnotationsByDescendantTimestamp(tables.completeds).map((annotation, index) => (
                mountCompletedAnnotation(annotation)
            ))}

        </section>
    );
}