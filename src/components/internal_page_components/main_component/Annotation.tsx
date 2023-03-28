import { useState, useRef, useContext } from "react";
import style from "./Main_style.module.css";
import { calculateData } from "../../../utils/timestamp";
import { AnnotationProps, SendToDeleteReponse, SaveAnnotationReponse } from "../../../interfaces/interfaces";
import { SendToDeleteRequestParameters, SaveAnnotationRequestParameters } from "../../../interfaces/interfaces";
import { SaveAnnotationData, SendToDeletedData } from "../../../interfaces/interfaces";
import { DeletePermanentlyData, DeletePermanentlyRequestParameters } from "../../../interfaces/interfaces";
import { Navigate } from "react-router-dom";
import { InternalPageContext } from "../InternalPage";

export default function Annotation({ title, content, id, timestamp }: AnnotationProps){

    const alterContext = useContext(InternalPageContext)!;

    const annotationBlock = useRef<HTMLHeadingElement | null>(null);
    const annotationTitle = useRef<HTMLHeadingElement | null>(null);
    const annotationContent = useRef<HTMLHeadingElement | null>(null);

    const [ currentTimestamp, setCurrentTimestamp ] = useState<number>(timestamp);
    const [ currentTitle, setCurrentTitle ] = useState<string>(title);
    const [ currentContent, setCurrentContent ] = useState<string>(content);

    const [ visualState, setVisualState ] =  useState<string>("closed");
    const [ canEdit, setPermissionToEdit ] = useState<boolean>(false);
    const [ externalTitle, setExternalTitle ] = useState<string>(title);
    const [ isAuthorized, setAuthorization ] = useState<boolean>(true);

    
    function openAnnotation(): void {
        if(visualState === "closed"){
            setVisualState("openned");
            setPermissionToEdit(true);
        }
    }

    function leaveAnnotation(): void {
        setVisualState("closed");
        setPermissionToEdit(false);
        saveChanges();
    }

    function handleTitleChange(): void {
        const titleElement = annotationTitle.current!;
        const titleText = titleElement.innerText;
        setExternalTitle(titleText);
    }

    /*
     * Save annotation functionality
     */

    function saveChanges(): void{
        const currentTable = annotationBlock.current!.parentElement;
        const parentId = currentTable!.id;
        const title = annotationTitle.current!.innerText;
        const content = annotationContent.current!.innerText;
        const currentAnnotationId = annotationBlock.current!.id;
        const stringfiedId = currentAnnotationId.match(/[0-9]+/);
        const numberId = Number(stringfiedId);

        setCurrentTitle(title);
        setCurrentContent(content);
        setCurrentTimestamp(Date.now());

        const saveAnnotationRequestParameters: SaveAnnotationRequestParameters = 
            arrangeSavingRequest(parentId, title, content, numberId);
        doSavingRequest(saveAnnotationRequestParameters);
    }

    function arrangeSavingRequest(parentId: string, title: string, content: string, numberId: number): SaveAnnotationRequestParameters {
        const currentTimestamp = Date.now();
        const userJWTToken = localStorage.getItem("token")!;
        const dataToSave: SaveAnnotationData = { 
            tableName: parentId,
            title: title, 
            content: content, 
            id: numberId, 
            timestamp: currentTimestamp,
            token: userJWTToken
        };
        const deleteRequestParameters: SaveAnnotationRequestParameters = {
            method: "PUT",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSave)
        };
        return deleteRequestParameters;
    }

    async function doSavingRequest(requestConfig: SaveAnnotationRequestParameters) {
        const response = await fetch("http://localhost:3001/save-annotation", requestConfig);
        const responseStringfied: string = await response.json();
        const responseObject: SaveAnnotationReponse = JSON.parse(responseStringfied);
        if(responseObject.authorized){
            if(responseObject.done){
                alterContext.reRenderPage();
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

    function deleteAnnotation(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        const unknownType = event as unknown;
        const eventMouseEvent = unknownType as MouseEvent;
        const actionElement = eventMouseEvent.target!;
        const actionElementHTML = actionElement as HTMLElement;
        const annotationId: string = annotationBlock.current!.id;
        if (annotationBlock.current!.parentElement!.id === "folders"){
            const annotationTitleToSend: string = annotationTitle.current!.innerText;
            const annotationContentToSend: string = annotationContent.current!.innerText;
            const requestConfig: SendToDeleteRequestParameters = arrangeDeleteRequest(annotationId, annotationTitleToSend, annotationContentToSend);
            doSendToDeletedRequest(requestConfig);
        }
        else if(annotationBlock.current!.parentElement!.id === "deleteds"){
            const requestConfig: DeletePermanentlyRequestParameters = arrangeDeletePermanentlyRequest(annotationId);
            removePermanently(requestConfig);
        }

    }

    function arrangeDeleteRequest(id: string, title: string, content: string): SendToDeleteRequestParameters {
        const numberPartInTheIdProperty = String(id.match(/\d+/));
        const currentTimestamp = Date.now();
        const userJWTToken = localStorage.getItem("token")!;
        const sendToDeletedData: SendToDeletedData = { 
            id: numberPartInTheIdProperty, 
            title: title, 
            content: content, 
            timestamp: currentTimestamp, 
            token: userJWTToken
        };
        const deleteRequestParameters: SendToDeleteRequestParameters = {
            method: "DELETE",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(sendToDeletedData)
        };
        return deleteRequestParameters;
    }

    async function doSendToDeletedRequest(deleteRequestParameters: SendToDeleteRequestParameters) {
        const response: Response = await fetch("http://localhost:3001/delete-folder-annotation", deleteRequestParameters);
        const responseStringfied: string = await response.json();
        const responseObject: SendToDeleteReponse = JSON.parse(responseStringfied);
        if(responseObject.authorized){
            if(responseObject.done){
                alterContext.reRenderPage();
            }
            else {
                console.log("error");
            }
        }   
        else {
            setAuthorization(false);
        }
    }

    function arrangeDeletePermanentlyRequest(id: string): DeletePermanentlyRequestParameters{
        const numberPartInTheIdProperty = String(id.match(/\d+/));
        const userJWTToken = localStorage.getItem("token")!;
        const sendToDeletedData: DeletePermanentlyData = { 
            id: numberPartInTheIdProperty, 
            token: userJWTToken
        };
        const deleteRequestParameters: DeletePermanentlyRequestParameters = {
            method: "DELETE",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(sendToDeletedData)
        };
        return deleteRequestParameters;
    }

    async function removePermanently(deleteRequestParameters: DeletePermanentlyRequestParameters){
        const response: Response = await fetch("http://localhost:3001/delete-annotation-permanently", deleteRequestParameters);
        const responseStringfied: string = await response.json();
        const responseObject: SendToDeleteReponse = JSON.parse(responseStringfied);
        if(responseObject.authorized){
            if(responseObject.done){
                alterContext.reRenderPage();
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
        <article className={`${style.annotation__block} ${ style[visualState]}`} id = {id}     
         onDoubleClick={() => openAnnotation()} ref={annotationBlock}>
                <div className={style.external__header}>
                    <h4 className={style.external__header__title}> { externalTitle } </h4>
                    <div className={ style.delete__item__icon} onClick={(event) => deleteAnnotation(event)}></div>
                </div>
                <div className={style.internal__header}>
                    <div className={ style.buttons__area}>
                        <div className={style.annonation__buttons}>
                            <button className={style.save__button} onClick={saveChanges}></button>
                            <button className={style.export__button} onClick={exportFileAsTxt}></button>
                        </div>
                        <button className={style.exit__button} onClick={leaveAnnotation}></button>
                    </div>
                    <h1 className={style.annotation__title} contentEditable={canEdit? "true" : "false"} onInput={() => handleTitleChange()} ref={annotationTitle}> 
                        {currentTitle} </h1>
                    <p className={style.annotation__date}> {calculateData(currentTimestamp)} </p>
                </div>
                <div className={style.annotation__content} contentEditable={canEdit? "true" : "false"} 
                ref={annotationContent}> {currentContent} </div>
                { !isAuthorized && (<Navigate to="/login"/>)}
        </article>
    );
}