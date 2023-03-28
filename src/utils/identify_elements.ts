const buttonIds = [
    "folder", 
    "completed", 
    "deleted"
];

export function isButton(targetElement: any): boolean{
    let isButton: boolean = buttonIds.some((elementId) => {
        return elementId === targetElement.id 
    });
    return isButton;
}

export function isTheTargetElementToShow(elementId: string, targetId: string): boolean {
    if(elementId === targetId){
        return true;
    }
    return false;
}

export function isNotTheThemeButton(elementId: string): boolean {
    if (elementId !== "t_button") {
      return true;
    }
    return false;
}