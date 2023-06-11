import React, { useState, useEffect, createContext } from "react";
import style from "../../styles/internal/Internal.module.css";

import { Data } from "../../types/data";
import { Props } from "../../types/props";

import Header from "./header/Header";
import Main from "./main/Main";
import { Navigate } from "react-router-dom";
import StatusPopUp from "../popups/StatusPopUp";

import { 
    isTargetElementButton, 
    isTheTargetElementToShow, 
    isNotTheThemeButton, 
    deepClone,
    delay
} from "../../lib/utils";
import { fetchAllData } from "../../actions/fetchAllData";


export const InternalPageContext = createContext<any>(null);

export default function InternalPage() {

    const backgroundElement = document.getElementById("internal__page__background")!;

    const [ theme, setTheme ] = useState(localStorage.getItem("theme") ?? "light");

    const [ tables, setTables ] = useState<Data.AnnotationSections>({ 
        folders: [], 
        completeds: [], 
        deleteds: []
    });

    const [ userInfo, setUserInfo ] = useState<Data.UserInfo>({ 
        name: "", 
        email: ""
    });

    const [ isAuthorized, setAuthorization ] = useState(false);
    const [ itsOkToRender, setPermissionToRender ] = useState(false);

    const [ popUpVisibility, setPopUpVisibility ] = useState("invisible");
    const [ statusPopUpData, setStatusPopUpData ] = useState({ 
        content: "anErrorOccurred",  
        status: "error" 
    });

    const [ visibleParameters, changedVisibility ] = useState<Data.VisibilityState>({  
        folder: "visible", 
        completed: "invisible", 
        deleted: "invisible"
    });

    const mainProps: Props.MainProps = {
        theme: theme,
        folderVisible: visibleParameters["folder"],
        completedVisible: visibleParameters["completed"],
        deletedVisible: visibleParameters["deleted"],
        tables: tables
    };

    const headerProps: Props.HeaderProps = {
        name: userInfo.name,
        email: userInfo.email,
        changeTheme: changeTheme,
        theme: theme,
        changeCurrentSection: changeCurrentSection
    };

    const contextValues = {
        showPopUp,
        addNewAnnotationToTablesObject,
        updateAnnotationInDOM,
        moveFromFoldersToDeletedInDOM,
        deleteAnnotationPermanentlyInDOM
    };

    let alreadyReloaded = false;

    useEffect(() => {
        if(!alreadyReloaded){
            if (backgroundElement) {
                backgroundElement.classList.add(localStorage.getItem("theme") ?? "light" );
            }
            alreadyReloaded = true;
            handleFetchAllDataRequest();
        }
    }, []);


    /*  
     * Fetching all the data from the database to distribute to Folder, Deleted and Completed components
     */


    async function handleFetchAllDataRequest(): Promise<void> {
        const response = await fetchAllData();

        if (response.authenticity) {
            const tables = response.tables;
            const userInformation = response.userInfo;  

            updateUserInfo(userInformation);
            setTables(tables);
            setAuthorization(true);
        }
        else {
            setAuthorization(false);
        }
        setPermissionToRender(true);
    }


    function updateUserInfo(userDataObject: Data.UserInfo): void {
        setUserInfo(userDataObject);
    }


    function changeCurrentSection(event: MouseEvent): void {
        const actionElement = event.target!;
        const actionElementHTML = actionElement as HTMLElement;
        const parentElement = document.getElementById("menu__items")!;
        const childrenArray = Array.from(parentElement.children);

        if (isTargetElementButton(actionElement)) { 

            const updatedParameters: {[key: string]: string} = { ...visibleParameters };

            for (let child of childrenArray) {
                if (isTheTargetElementToShow(child.id, actionElementHTML.id)) {
                    updatedParameters[child.id] = "visible";
                } 
                else if (isNotTheThemeButton(child.id)){
                    updatedParameters[child.id] = "invisible";
                }
            }

            const finalParameters: Data.VisibilityState = {
                folder: updatedParameters.folder || "",
                completed: updatedParameters.completed || "",
                deleted: updatedParameters.deleted || "",
            };    

            changedVisibility(finalParameters);
        }
    }


    function changeTheme(): void {  
        localStorage.setItem("theme", (theme === "light")? "dark" : "light");
        setTheme(localStorage.getItem("theme") ?? "light");  
    }


    function updateAnnotationInDOM(
        title: string, 
        content: string, 
        parentId: string, 
        id: number, 
        timestamp: number
    ): void {  

        setTables(oldTables => {
            const tablesDeepCopy = deepClone(oldTables);
            const target = tablesDeepCopy[parentId].filter(annot => annot.id === id)[0];

            target.title = title;
            target.content = content;
            target.timestamp = timestamp;

            return tablesDeepCopy;
        });
    }


    function addNewAnnotationToTablesObject(
        id: number, 
        title: string, 
        content: string, 
        timestamp: number
    ): void {

        const newAnnotationData: Data.Annotation = {
            id,
            title,
            content,
            timestamp
        };

        setTables(oldTables => {
            const tablesDeepCopy = deepClone(oldTables);
            tablesDeepCopy.folders.unshift(newAnnotationData);

            return tablesDeepCopy;
        })

    }


    function moveFromFoldersToDeletedInDOM(
        oldId: number,
        id: number, 
        title: string, 
        content: string, 
        timestamp: number
    ): void {

        const newAnnotationMetadata = {
            id,
            title,
            content,
            timestamp
        };

        setTables(oldTables => {

            const tablesDeepCopy = deepClone(oldTables);

            const folderTableModified = tablesDeepCopy.folders.filter(table => table.id !== oldId);
            const deletedTableModified = [ newAnnotationMetadata, ...tablesDeepCopy.deleteds ];
            const completedTable = tablesDeepCopy.completeds;

            const newTablesObject: Data.AnnotationSections = {
                folders: folderTableModified,
                deleteds: deletedTableModified,
                completeds: completedTable
            }

            return newTablesObject;
        });

    }


    function deleteAnnotationPermanentlyInDOM(id: number): void {
        setTables(oldTables => {
            const tablesDeepCopy = deepClone(oldTables);
            const modifiedDeletedTable = tablesDeepCopy.deleteds.filter(annot => annot.id !== id);

            const newTablesObject: Data.AnnotationSections = {
                folders: tablesDeepCopy.folders,
                deleteds: modifiedDeletedTable,
                completeds: tablesDeepCopy.completeds
            }

            return newTablesObject;
        })
    }

    async function showPopUp(
        content: string = statusPopUpData.content, 
        success: boolean = false
    ): Promise<void> {

        setStatusPopUpData({ 
            content, 
            status: success? "success" : "error" 
        });

        setPopUpVisibility("visible");
        await delay(5000);
        setPopUpVisibility("invisible");
    }

    return (
        <div 
          className={`${style.internal__page__background} ${style[theme]}`} id="internal__page__background"
        >
            <StatusPopUp {...statusPopUpData} visibilityClass={popUpVisibility}/>
            { itsOkToRender && isAuthorized && ( 
              <React.Fragment>
                <Header {...headerProps}/>
                <InternalPageContext.Provider value={contextValues}>
                  <Main {...mainProps}/>
                </InternalPageContext.Provider>
              </React.Fragment>
            )}
            { itsOkToRender && !isAuthorized && (<Navigate to="/login"/>)}
        </div>
    );
}