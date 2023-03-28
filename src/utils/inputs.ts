export function someInputIsVoid(...data: string[]): boolean{
    const someIsVoid = data.some(input => { return input === "" });
    if(someIsVoid){ 
        return true;
    }
    return false;
}