import { Data } from "./data";

namespace Response {

    interface LogonResponse {
        userExists: boolean;
        validInput: boolean;
    }
    
    interface LoginResponse {
        validated: boolean;
        token: string;
    }
    
    interface InternalPageResponse {
        authenticity: boolean;
        tables: Data.Tables;
        userInfo: Data.UserInfo;
    }
    
    interface CreateAnnotationResponse {
        authorized: boolean;
        annotationInfo: Data.Annotation;
    }

    interface DeleteTemporaryResponse {
        authorized: boolean;
        done: boolean;
    }

    interface DeletePermanentlyResponse {
        authorized: boolean;
        done: boolean;
    }
    
    interface SaveAnnotationResponse {
        authorized: boolean;
        timestamp: number;
        done: boolean;
    }

}