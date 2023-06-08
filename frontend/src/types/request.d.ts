export namespace Request {

    interface LogonRequestParameters {
        method: "POST";
        header: {[key: string]: string};
        body: string;
    }
    
    interface LoginRequestParameters {
        method: "POST";
        header: {[key: string]: string};
        body: string;
    }
    
    interface FetchAllDataRequestParameters {
        method: "POST";
        header: {[key: string]: string};
        body: string;
    }
    
    interface SendToDeleteRequestParameters {
        method: "DELETE";
        header: {[key: string]: string};
        body: string;
    }
    
    interface DeletePermanentlyRequestParameters {
        method: "DELETE";
        header: {[key: string]: string};
        body: string;
    }
    
    interface SaveAnnotationRequestParameters {
        method: "PUT";
        header: {[key: string]: string};
        body: string;
    }
    
    interface CreateAnnotationRequestParameters {
        method: "POST";
        header: {[key: string]: string};
        body: string;
    }
    
}