import { FETCH_USER_INITIAL_DATA_ENDPOINT } from "../lib/endpoints";
import { Request } from "../types/request";
import { Response } from "../types/response";

export function fetchAllData(): Promise<Response.InternalPageResponse> {
    const requestConfig = arrangeFetchAllDataRequest();
    const promisedResponseData = doFetchAllDataRequest(requestConfig);
    return promisedResponseData;
}

function arrangeFetchAllDataRequest() {
    const userTokenObject = { 
        token: localStorage.getItem("token") ?? "" 
    };

    const requestParameters: Request.FetchAllDataRequestParameters = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(userTokenObject)
    };

    return requestParameters;
}

async function doFetchAllDataRequest(
    requestConfig: Request.FetchAllDataRequestParameters
): Promise<Response.InternalPageResponse> {

    const response = await fetch(FETCH_USER_INITIAL_DATA_ENDPOINT, requestConfig);
    const responseStringfied = await response.json();
    const responseObject: Response.InternalPageResponse = JSON.parse(responseStringfied);

    return responseObject;
}

