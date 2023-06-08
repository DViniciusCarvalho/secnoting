
export function isButton(targetElement: any): boolean {
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

export function delay(ms: number){
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