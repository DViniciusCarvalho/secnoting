import { someInputIsVoid } from "./inputs";
import { LogonRequestParameters, LoginRequestParameters } from "../interfaces/interfaces";

export function arrangeLoginRequest(email: string, password: string, event: React.MouseEvent<HTMLInputElement, MouseEvent>): LoginRequestParameters | false {
    const eventUnknown = event as unknown;
    const eventMouseEvent = eventUnknown as MouseEvent;
    eventMouseEvent.preventDefault();
    if(!someInputIsVoid(email, password)){     
        const userData = { email: email, password: password };
        const loginRequestParameters: LoginRequestParameters = {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        };
        return loginRequestParameters;
    }
    return false;
}

export function arrangeLogonRequest(name: string, email: string, password: string, 
    event: React.MouseEvent<HTMLInputElement, MouseEvent>): LogonRequestParameters | false{
    const eventUnknown = event as unknown;
    const eventMouseEvent = eventUnknown as MouseEvent;
    eventMouseEvent.preventDefault();
    if(!someInputIsVoid(name, email, password)){
        const userData = { name: name, email: email, password: password };
        const requestParameters: LogonRequestParameters = {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        };
        return requestParameters;
    }
    return false;
}