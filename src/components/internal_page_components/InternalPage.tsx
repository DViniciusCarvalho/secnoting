import React, { useState, useEffect, createContext } from "react";
import style from "./InternalPage_style.module.css";
import { Tables, UserInfo, VisibilityState } from "../../interfaces/interfaces";
import { MainProps, HeaderProps, InternalPageResponse } from "../../interfaces/interfaces";
import Header from "./header_component/Header";
import Main from "./main_component/Main";
import { Navigate } from "react-router-dom";
import { ContextProps, FetchAllDataRequestParameters } from "../../interfaces/interfaces";
import { isButton, isTheTargetElementToShow, isNotTheThemeButton } from "../../utils/identify_elements";

export const InternalPageContext = createContext<ContextProps | null>(null);

export default function InternalPage(){

    const backgroundElement = document.getElementById("internal__page__background")!;
    const [ screen, setColorTheme ] = useState<{[theme: string]: string}>(
        { theme: localStorage.getItem("theme") ?? "light" });

    const [ tables, setTables ] = useState<Tables>({ folders: [], completeds: [], deleteds: []});
    const [ userInfo, setUserInfo ] = useState<UserInfo>({ name: "", email: ""});
    const [ isAuthorized, setAuthorization ] = useState<boolean>(false);
    const [ itsOkToRender, setPermissionToRender ] = useState<boolean>(false);
    const [ visibleParameters, changedVisibility ] = useState<VisibilityState>({  
        folder: "visible", 
        completed: "invisible", 
        deleted: "invisible"
    });

    const mainProps: MainProps = {
        theme: screen.theme,
        folderVisible: visibleParameters["folder"],
        completedVisible: visibleParameters["completed"],
        deletedVisible: visibleParameters["deleted"],
        tables: tables
    };

    const headerProps: HeaderProps = {
        name: userInfo.name,
        email: userInfo.email,
        changeTheme: changedTheme,
        theme: screen.theme,
        changedScreen: changedScreen
    };

    let alreadyReloaded = false;

    function reRenderPage(): void{
        window.location.reload();
    }

    useEffect(() => {
        if(!alreadyReloaded){
            if (backgroundElement) {
                backgroundElement.classList.add(localStorage.getItem("theme") ?? "light" );
            }
            alreadyReloaded = true;
            arrangeFetchAllDataRequest(localStorage.getItem("token") ?? "");
        }
    }, []);

    /*  
     * Fetching all the data from the database to distribute to Folder, Deleted and Completed components
     */

    function arrangeFetchAllDataRequest(JWTtoken: string): void{
        const userTokenObject = { token: JWTtoken }
        const fetchAllDataRequestParameters: FetchAllDataRequestParameters = {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(userTokenObject)
        }
        doFetchAllDataRequest(fetchAllDataRequestParameters);
    }

    async function doFetchAllDataRequest(requestConfig: FetchAllDataRequestParameters){
        let response = await fetch("http://localhost:3001/internal-page-validation", requestConfig);
        let responseStringfied = await response.json();
        let responseObject: InternalPageResponse = JSON.parse(responseStringfied);
        console.log(responseObject)
        handleFetchAllDataResponse(responseObject);
    }

    function handleFetchAllDataResponse(dataResponsed: InternalPageResponse): void{
        if(dataResponsed["authenticity"]){
            const tables = dataResponsed["tables"];
            const user_information = dataResponsed["user_info"];
            updateUserInfo(user_information);
            setTables(tables);
            setAuthorization(true);
        }
        else {
            setAuthorization(false);
        }
        setPermissionToRender(true);
    }

    function updateUserInfo(userDataObject: UserInfo): void{
        setUserInfo(userDataObject);
    }

    /*
     * Screen (folders, completeds, deleteds) changing functionality
     */

    function changedScreen(event: MouseEvent): void{
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
            const finalParameters: VisibilityState = {
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
    function changedTheme(): void{  
        if (screen.theme === "light") {
            localStorage.setItem("theme", "dark");
            setColorTheme({ theme: localStorage.getItem("theme") ?? "light" });
        }
        else {
            localStorage.setItem("theme", "light");
            setColorTheme({ theme: localStorage.getItem("theme") ?? "light" });
        }     
    }

    return (
        <div className={`${style.internal__page__background} ${style[screen.theme]}`} id="internal__page__background">
            { itsOkToRender && isAuthorized && ( 
              <React.Fragment>
                <Header {...headerProps}/>
                <InternalPageContext.Provider value={{reRenderPage}}>
                  <Main {...mainProps}/>
                </InternalPageContext.Provider>
              </React.Fragment>
            )}
            { itsOkToRender && !isAuthorized && (<Navigate to="/login"/>)}
        </div>
    );
}