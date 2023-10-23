import { SAVE_ANNOTATION_CHANGES_ENDPOINT } from "../../lib/endpoints";
import { Data } from "../../types/data";
import { Request } from "../../types/request";
import { Response } from "../../types/response";


export function saveChanges(
    parentId: string, 
    title: string, 
    content: string, 
    numberId: number,
): Promise<Response.SaveAnnotationResponse> {
    
    const requestConfig = arrangeSavingRequest(parentId, title, content, numberId);
    const promisedResponseData = doSavingRequest(requestConfig);
    return promisedResponseData;
}


function arrangeSavingRequest(
    parentId: string, 
    title: string, 
    content: string, 
    numberId: number
): Request.SaveAnnotationRequestParameters {

    const data: Omit<Data.SaveAnnotationData, "timestamp"> = { 
        tableName: parentId,
        title: title, 
        content: content, 
        id: numberId, 
        token: localStorage.getItem("token") ?? ""
    };

    const requestParameters: Request.SaveAnnotationRequestParameters = {
        method: "PUT",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return requestParameters;
}

async function doSavingRequest(
    requestConfig: Request.SaveAnnotationRequestParameters
): Promise<Response.SaveAnnotationResponse> {

    const response = await fetch(
        SAVE_ANNOTATION_CHANGES_ENDPOINT, 
        requestConfig
    );
    
    const responseStringfied: string = await response.json();
    const responseObject: Response.SaveAnnotationResponse = JSON.parse(responseStringfied);

    return responseObject;
}