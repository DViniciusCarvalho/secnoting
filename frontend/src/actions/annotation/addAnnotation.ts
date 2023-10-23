import { ADD_ANNOTATION_ENDPOINT } from "../../lib/endpoints";
import { Request } from "../../types/request";
import { Response } from "../../types/response";

export function createAnnotation(): Promise<Response.CreateAnnotationResponse> { 
    const requestConfig = arrangeAnnotationRequest();
    const promisedResponseData = doAnnotationRequest(requestConfig);
    return promisedResponseData;
}

function arrangeAnnotationRequest(): Request.CreateAnnotationRequestParameters {
    const userToken = {
        token: localStorage.getItem("token") ?? ""
    };

    const createAnnotationRequestParameters: Request.CreateAnnotationRequestParameters = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(userToken)
    };

    return createAnnotationRequestParameters;
}

async function doAnnotationRequest(
    requestConfig: Request.CreateAnnotationRequestParameters
): Promise<Response.CreateAnnotationResponse> {
    
    const response = await fetch(ADD_ANNOTATION_ENDPOINT, requestConfig);
    const responseStringfied = await response.json();
    const responseObject = JSON.parse(responseStringfied);

    return responseObject;      
}