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
