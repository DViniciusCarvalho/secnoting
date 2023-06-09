import { useState, useRef, useContext } from "react";
import style from "../../../styles/internal/main/Main.module.css";
import { calculateData } from "../../../lib/utils";

import { Props } from "../../../types/props";

import { Navigate } from "react-router-dom";
import { InternalPageContext } from "../InternalPage";
import { saveChanges } from "../../../actions/annotation/saveChanges";
import { deleteTemporary } from "../../../actions/annotation/deleteTemporary";
import { deletePermanently } from "../../../actions/annotation/deletePermanently";


export default function Annotation({ 
    title, 
    content, 
    id, 
    timestamp, 
}: Props.AnnotationProps){

    const { 
        updateTimestampInDOM,
        moveFromFoldersToDeletedInDOM, 
        deleteAnnotationPermanentlyInDOM 
    } = useContext(InternalPageContext)!;

    const annotationBlock = useRef<HTMLHeadingElement | null>(null);
    const annotationTitle = useRef<HTMLHeadingElement | null>(null);
    const annotationContent = useRef<HTMLHeadingElement | null>(null);

    const [ currentTimestamp, setCurrentTimestamp ] = useState<number>(timestamp);
    const [ currentTitle, setCurrentTitle ] = useState<string>(title);
    const [ currentContent, setCurrentContent ] = useState<string>(content);

    const [ visualState, setVisualState ] =  useState<string>("closed");
    const [ canEdit, setCanEdit ] = useState<boolean>(false);
    const [ externalTitle, setExternalTitle ] = useState<string>(title);
    const [ isAuthorized, setAuthorization ] = useState<boolean>(true);

    
    function openAnnotation(): void {
        if(visualState === "closed"){
            setVisualState("openned");
            setCanEdit(true);
        }
    }

    function leaveAnnotation(): void {
        setVisualState("closed");
        setCanEdit(false);
        handleSaveChanges();
    }

    function handleTitleChange(): void {
        const titleElement = annotationTitle.current!;
        const titleText = titleElement.innerText;
        setExternalTitle(titleText);
    }

    /*
     * Save annotation functionality
     */

    async function handleSaveChanges(){
        const currentTable = annotationBlock.current!.parentElement;
        const parentId = currentTable!.id;
        const title = annotationTitle.current!.innerText;
        const content = annotationContent.current!.innerText;
        const currentAnnotationId = annotationBlock.current!.id;
        const stringfiedId = currentAnnotationId.match(/[0-9]+/);
        const numberId = Number(stringfiedId);
        

        const response = await saveChanges(parentId, title, content, numberId);

        if(response.authorized){
            if(response.done){
                setCurrentTitle(title);
                setCurrentContent(content);
                setCurrentTimestamp(response.timestamp);
                updateTimestampInDOM(parentId, numberId, response.timestamp);
                setAuthorization(true);
            }
        }
        else {
            setAuthorization(false);
        }
    }

    /*
     * Export file as ".txt" functionality
     */

    function exportFileAsTxt(): void {
        const textToDownload = annotationContent.current!.innerText;
        const fileTitle = annotationTitle.current!.innerText;

        const blob = new Blob([textToDownload], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${fileTitle}.txt`);
        link.dispatchEvent(new MouseEvent("click"));
    }

    /*
     * Delete functionality
     */

    function handleDeleteAnnotation(): void {
        const annotationId = annotationBlock.current!.id;
        const numberPartInTheIdProperty = Number(annotationId.match(/\d+/));

        if (annotationBlock.current!.parentElement!.id === "folders"){
            const annotationTitleToSend = annotationTitle.current!.innerText;
            const annotationContentToSend = annotationContent.current!.innerText;

            handleDeleteTemporary(
                numberPartInTheIdProperty, 
                annotationTitleToSend, 
                annotationContentToSend
            );
        }
        else if(annotationBlock.current!.parentElement!.id === "deleteds"){
            handleDeletePermanently(numberPartInTheIdProperty);
        }

    }

    async function handleDeleteTemporary(annotationId: number, title: string, content: string) {
        const response = await deleteTemporary(annotationId, title, content);

        if(response.authorized){
            if(response.done){
                moveFromFoldersToDeletedInDOM(annotationId, response.id, title, content, response.timestamp);
            }
            else {
                console.log("error");
            }
        }   
        else {
            setAuthorization(false);
        }
    }

    async function handleDeletePermanently(annotationId: number) {

        const response = await deletePermanently(annotationId);

        if(response.authorized){
            if(response.done){
                deleteAnnotationPermanentlyInDOM(annotationId); // refatorar
            }
            else {
                console.log("error");
            }
        }   
        else {
            setAuthorization(false);
        }
    }

    return (
        <article 
          className={`${style.annotation__block} ${ style[visualState]}`} 
          id = {id}     
          onDoubleClick={() => openAnnotation()} 
          ref={annotationBlock}
        >
                <div className={style.external__header}>
                    <h4 className={style.external__header__title}> { externalTitle } </h4>
                    <div className={ style.delete__item__icon} onClick={handleDeleteAnnotation}/>
                </div>
                <div className={style.internal__header}>
                    <div className={ style.buttons__area}>
                        <div className={style.annonation__buttons}>
                            <button className={style.save__button} onClick={handleSaveChanges}></button>
                            <button className={style.export__button} onClick={exportFileAsTxt}></button>
                        </div>
                        <button className={style.exit__button} onClick={leaveAnnotation}></button>
                    </div>
                    <h1 
                      className={style.annotation__title} 
                      contentEditable={canEdit? "true" : "false"} 
                      onInput={() => handleTitleChange()} 
                      ref={annotationTitle}
                    > 
                        {currentTitle} 
                    </h1>
                    <p className={style.annotation__date}> {calculateData(currentTimestamp)} </p>
                </div>
                <div 
                  className={style.annotation__content} 
                  contentEditable={canEdit? "true" : "false"} 
                  ref={annotationContent}
                > 
                    {currentContent} 
                </div>
                { !isAuthorized && (<Navigate to="/login"/>)}
        </article>
    );
}