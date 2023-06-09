import { Data } from "../../types/data";
import { Request } from "../../types/request";
import { Response } from "../../types/response";


export function deleteTemporary(
    id: number, 
    title: string, 
    content: string
): Promise<Response.DeleteTemporaryResponse> {
    
    const requestConfig = arrangeDeleteRequest(id, title, content);
    const promisedResponseData = doDeleteRequest(requestConfig);
    return promisedResponseData;
}

function arrangeDeleteRequest(
    id: number, 
    title: string, 
    content: string
): Request.SendToDeleteRequestParameters {


    const sendToDeletedData: Data.DeleteTemporaryData = { 
        id: id, 
        title: title, 
        content: content, 
        token: localStorage.getItem("token") ?? ""
    };

    const deleteRequestParameters: Request.SendToDeleteRequestParameters = {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(sendToDeletedData)
    };

    return deleteRequestParameters;

}

async function doDeleteRequest(
    deleteRequestParameters: Request.SendToDeleteRequestParameters
): Promise<Response.DeleteTemporaryResponse> {

    const response: Response = await fetch(
        "http://localhost:3001/delete-folder-annotation", 
        deleteRequestParameters
    );

    const responseStringfied: string = await response.json();
    const responseObject: Response.DeleteTemporaryResponse = JSON.parse(responseStringfied);

    return responseObject;

}