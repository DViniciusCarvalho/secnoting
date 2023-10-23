import { Request } from "../types/request";
import { Response } from "../types/response";
import { someInputIsVoid } from "../lib/utils";
import { LOGON_USER_ENDPOINT } from "../lib/endpoints";

export function logon(
    name: string, 
    email: string, 
    password: string
): Promise<Response.LogonResponse | false> {

    const requestConfig = arrangeLogonRequest(name, email, password);

    if (requestConfig) {
        const promisedResponseData = doLogonRequest(requestConfig);
        return promisedResponseData;
    }

    return new Promise(res => res(false));
}

function arrangeLogonRequest(
    name: string, 
    email: string, 
    password: string
): Request.LogonRequestParameters | false{

    if(!someInputIsVoid(name, email, password)){
        const userData = { 
            name: name, 
            email: email, 
            password: password 
        };

        const requestParameters: Request.LogonRequestParameters = {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        };

        return requestParameters;
    }

    return false;
}

async function doLogonRequest(
    requestConfig: Request.LogonRequestParameters
): Promise<Response.LogonResponse> {
    
    const response = await fetch(LOGON_USER_ENDPOINT, requestConfig);
    const responseStringfied = await response.json();
    const responseObject = JSON.parse(responseStringfied);

    return responseObject;
}