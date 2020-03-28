// export function hello() {
//     console.log("hello");

// }
export function getLastRow(ws: any): Excel.Range {
    const rangeA = ws.getRange('A:ZZ');
    const lastRow = rangeA.find("*", {
        completeMatch: true, // find will match the whole cell value
        matchCase: false, // find will not match case
        searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
    })
    return lastRow
}
export function getLastCol(ws: any): Excel.Range {
    const rangeA = ws.getRange('A1:ZZ4');
    const lastCol = rangeA.find("*", {
        completeMatch: true, // find will match the whole cell value
        matchCase: false, // find will not match case
        searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
    })
    return lastCol
}

export interface getLastColTypes {
    
}
export class getLastColTest implements getLastColTypes {
    constructor(ws: any, context: any) {
        const rangeA = ws.getRange('A1:ZZ4');
        const lastCol = rangeA.find("*", {
        completeMatch: true, // find will match the whole cell value
        matchCase: false, // find will not match case
        searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
        });
        lastCol.load('address');
        context.sync();
        console.log(lastCol.address);
    }
}
