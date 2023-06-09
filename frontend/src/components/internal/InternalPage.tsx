import React, { useState, useEffect, createContext } from "react";
import style from "../../styles/internal/Internal.module.css";

import { Data } from "../../types/data";
import { Props } from "../../types/props";

import Header from "./header_component/Header";
import Main from "./main_component/Main";
import { Navigate } from "react-router-dom";

import { 
    isButton, 
    isTheTargetElementToShow, 
    isNotTheThemeButton, 
    deepClone
} from "../../lib/utils";
import { fetchAllData } from "../../actions/fetchAllData";


export const InternalPageContext = createContext<any>(null);

export default function InternalPage(){

    const backgroundElement = document.getElementById("internal__page__background")!;

    const [ screen, setColorTheme ] = useState({ 
        theme: localStorage.getItem("theme") ?? "light" 
    });

    const [ tables, setTables ] = useState<Data.Tables>({ 
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

    const [ visibleParameters, changedVisibility ] = useState<Data.VisibilityState>({  
        folder: "visible", 
        completed: "invisible", 
        deleted: "invisible"
    });

    const mainProps: Props.MainProps = {
        theme: screen.theme,
        folderVisible: visibleParameters["folder"],
        completedVisible: visibleParameters["completed"],
        deletedVisible: visibleParameters["deleted"],
        tables: tables
    };

    const headerProps: Props.HeaderProps = {
        name: userInfo.name,
        email: userInfo.email,
        changeTheme: changedTheme,
        theme: screen.theme,
        changedScreen: changedScreen
    };

    const contextValues = {
        addNewAnnotationToTablesObject,
        updateTimestampInDOM,
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
            const user_information = response.userInfo;  

            updateUserInfo(user_information);
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

    /*
     * Screen (folders, completeds, deleteds) changing functionality
     */

    function changedScreen(event: MouseEvent): void {
        const actionElement = event.target!;
        const actionElementHTML = actionElement as HTMLElement;
        const parentElement = document.getElementById("menu__items")!;
        const childrenArray = Array.from(parentElement.children);

        if (isButton(actionElement)) { 

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

    /*
     * Theme changing functionality
     */

    function changedTheme(): void {  
        localStorage.setItem("theme", (screen.theme === "light")? "dark" : "light");
        setColorTheme({ theme: localStorage.getItem("theme") ?? "light" });  
    }

    function updateTimestampInDOM(parentId: string, id: number, timestamp: number): void {  

        setTables(oldTables => {
            const tablesDeepCopy = deepClone(oldTables);
            const target = tablesDeepCopy[parentId].filter(annot => annot.id === id)[0];
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

            const newTablesObject: Data.Tables = {
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

            const newTablesObject: Data.Tables = {
                folders: tablesDeepCopy.folders,
                deleteds: modifiedDeletedTable,
                completeds: tablesDeepCopy.completeds
            }

            return newTablesObject;
        })
    }

    return (
        <div 
          className={`${style.internal__page__background} ${style[screen.theme]}`} id="internal__page__background"
        >
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