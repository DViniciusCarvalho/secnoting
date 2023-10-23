import { Request } from "../types/request";
import { Response } from "../types/response";
import { someInputIsVoid } from "../lib/utils";
import { LOGIN_USER_ENDPOINT } from "../lib/endpoints";


export function login(    
    email: string, 
    password: string
): Promise<Response.LoginResponse | false> {

    const requestConfig = arrangeLoginRequest(email, password);
    if (requestConfig) {
        const promisedResponseData = doLoginRequest(requestConfig);
        return promisedResponseData;
    }

    return new Promise(res => res(false));
}

function arrangeLoginRequest(
    email: string, 
    password: string
): Request.LoginRequestParameters | false {

    if(!someInputIsVoid(email, password)){  
        const userData = { 
            email: email, 
            password: password 
        };

        const loginRequestParameters: Request.LoginRequestParameters = {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        };

        return loginRequestParameters;
    }
    
    return false;
}

async function doLoginRequest(
    requestConfig: Request.LoginRequestParameters
): Promise<Response.LoginResponse> {

    const response = await fetch(LOGIN_USER_ENDPOINT, requestConfig);
    const responseStringfied = await response.json();
    const responseObject = JSON.parse(responseStringfied);

    return responseObject;
}