import { DELETE_ANNOTATION_PERMANENTLY_ENDPOINT } from "../../lib/endpoints";
import { Data } from "../../types/data";
import { Request } from "../../types/request";
import { Response } from "../../types/response";


export function deletePermanently(
    annotationId: number
): Promise<Response.DeletePermanentlyResponse> {
    
    const requestConfig = arrangeDeletePermanentlyRequest(annotationId);
    const promisedResponseData = doDeletePermanentlyRequest(requestConfig);
    return promisedResponseData;
}

function arrangeDeletePermanentlyRequest(id: number): Request.DeletePermanentlyRequestParameters {

    const sendToDeletedData: Data.DeletePermanentlyData = { 
        id: id, 
        token: localStorage.getItem("token") ?? ""
    };

    const deleteRequestParameters: Request.DeletePermanentlyRequestParameters = {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(sendToDeletedData)
    };

    return deleteRequestParameters;

}

async function doDeletePermanentlyRequest(
    deleteRequestParameters: Request.DeletePermanentlyRequestParameters
): Promise<Response.DeletePermanentlyResponse> {

    const response: Response = await fetch(
        DELETE_ANNOTATION_PERMANENTLY_ENDPOINT, 
        deleteRequestParameters
    );

    const responseStringfied: string = await response.json();
    const responseObject: Response.DeletePermanentlyResponse = JSON.parse(responseStringfied);

    return responseObject;

}