
export function calculateData(timestamp: number): string{

    let dateObject = new Date(timestamp);

    let day = dateObject.getDate() < 10? "0" + dateObject.getDate() : dateObject.getDate();
    let month = dateObject.getMonth() + 1 < 10? "0" + (dateObject.getMonth() + 1) : (dateObject.getMonth() + 1);
    let year = dateObject.getFullYear();

    return `${month}/${day}/${year}`;
    
}