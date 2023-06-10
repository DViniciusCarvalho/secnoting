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
}: Props.AnnotationProps) {

    const { 
        showPopUp,
        updateAnnotationInDOM,
        moveFromFoldersToDeletedInDOM,
        deleteAnnotationPermanentlyInDOM
    } = useContext(InternalPageContext)!;

    const annotationBlock = useRef<any>(null);
    const annotationTitle = useRef<any>(null);
    const annotationContent = useRef<any>(null);

    const [ currentTimestamp, setCurrentTimestamp ] = useState(timestamp);
    const [ currentTitle, setCurrentTitle ] = useState(title);
    const [ currentContent, setCurrentContent ] = useState(content);

    const [ visualState, setVisualState ] =  useState("closed");
    const [ canEdit, setCanEdit ] = useState(false);
    const [ externalTitle, setExternalTitle ] = useState(title);
    const [ isAuthorized, setAuthorization ] = useState(true);

    
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


    async function handleSaveChanges(): Promise<void> {
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
                updateAnnotationInDOM(title, content, parentId, numberId, response.timestamp);
                setAuthorization(true);
            }
        }
        else {
            setAuthorization(false);
        }
    }


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

    async function handleDeleteTemporary(
        annotationId: number, 
        title: string, 
        content: string
    ): Promise<void> {

        const response = await deleteTemporary(annotationId, title, content);

        if(response.authorized){
            if(response.done){
                moveFromFoldersToDeletedInDOM(
                    annotationId, 
                    response.id, 
                    title, 
                    content, 
                    response.timestamp
                );
            }
            else {
                showPopUp("anErrorOccurred", false);
            }
        }   
        else {
            setAuthorization(false);
        }
    }

    async function handleDeletePermanently(annotationId: number): Promise<void> {

        const response = await deletePermanently(annotationId);

        if(response.authorized){
            if(response.done){
                deleteAnnotationPermanentlyInDOM(annotationId);
            }
            else {
                showPopUp("anErrorOccurred", false);
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
                    <h4 className={style.external__header__title}>
                        {externalTitle}
                    </h4>
                    <div className={style.delete__item__icon} onClick={handleDeleteAnnotation}/>
                </div>
                <div className={style.internal__header}>
                    <div className={ style.buttons__area}>
                        <div className={style.annonation__buttons}>
                            <button className={style.save__button} onClick={handleSaveChanges}/>
                            <button className={style.export__button} onClick={exportFileAsTxt}/>
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
                    <p className={style.annotation__date}>
                        {calculateData(currentTimestamp)} 
                    </p>
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