import { Data } from "../types/data";

export function isTargetElementButton(targetElement: any): boolean {
    const buttonIds = [
        "folder", 
        "completed", 
        "deleted"
    ];

    const isButton: boolean = buttonIds.some(elementId => elementId === targetElement.id);
    return isButton;
}

export function isTheTargetElementToShow(elementId: string, targetId: string): boolean {
    return elementId === targetId;
}

export function isNotTheThemeButton(elementId: string): boolean {
    return elementId !== "t_button";
}

export function delay(ms: number): Promise<null> {
    return new Promise(res => {
        setTimeout(() => res(null), ms);
    })
}

export function calculateData(timestamp: number): string {

    const dateObject = new Date(timestamp);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();

    return `${month}/${day}/${year}`;
    
}

export function someInputIsVoid(...data: string[]): boolean {
    const someIsVoid = data.some(input => !input.length);
    return someIsVoid
}

export function deepClone<T>(object: T): T {
    if (typeof object !== "object" || object === null) return object;
    const newObject: T | [] | {} = Array.isArray(object)? [] : {};
    for (let key in object) {
        const value = object[key];
        (newObject as T)[key] = deepClone(value);
    }
    return newObject as T;
}

export function sortAnnotationsByDescendantTimestamp(
    annotations: Data.Annotation[]
): Data.Annotation[] {

    return annotations.sort((a: Data.Annotation, b: Data.Annotation) => {
        return b.timestamp - a.timestamp;
    });
    
}
