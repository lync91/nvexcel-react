import { AsyncConstructor } from 'async-constructor'
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

export interface addressTypes {
    text: string;
    col: string;
    row: number
}

export function addressParse(txt:string): addressTypes {
    const data: addressTypes = {
        text: '',
        col: '',
        row: 1
    }
    const m: RegExpMatchArray | null = txt.match(/(?=!)[^\]]+/g)
    console.log(m[1]);
    
    
    return data;
}

export function getWsInfo(wsName: string | null = null) {
    const promise = new Promise((resolve, rejects) => {
        try {
            Excel.run(async context => {
                let ws: Excel.Worksheet = context.workbook.worksheets.getActiveWorksheet()
                wsName ? ws = context.workbook.worksheets.getItem(wsName)
                    : ws = context.workbook.worksheets.getActiveWorksheet();
                ws.load('name');
                const lastCol = getLastCol(ws);
                lastCol.load('address');
                await context.sync();
                resolve({
                    name: ws.name
                })
            })
        } catch (error) {
            rejects(error)
        }
    })
    return promise
}

export interface getLastColTypes { 
    wsName?: string | null; 
    name?: string | null; 
}
export class wsObject extends AsyncConstructor  {
    ws: Excel.Worksheet | null = null;
    context: Excel.RequestContext | null = null;
	static init() {
		throw new Error("Method not implemented.");
	}
    wsName: string | null = null;
    name!: string;
    lastCol!: addressTypes;
    lastRow!: addressTypes;
    constructor(wsName: string | null = null) {
        super(async () => {
            this.wsName = wsName;
            try {
                await Excel.run(async context => {
                    let ws: Excel.Worksheet = context.workbook.worksheets.getActiveWorksheet()
                    wsName ? ws = context.workbook.worksheets.getItem(wsName)
                        : ws = context.workbook.worksheets.getActiveWorksheet();
                    this.ws = ws;
                    ws.load('name');
                    const lastRow: Excel.Range = getLastRow(ws);
                    const lastCol: Excel.Range = getLastCol(ws);
                    lastRow.load('address');
                    lastCol.load('address');
                    await context.sync();
                    console.log(lastRow.address);
                    console.log(lastCol.address);
                    addressParse(lastRow.address)
                    this.name = ws.name;
                    this.context = context;
                })
            } catch (error) {
            }
        })
    }
    async getValues(address: string) {
        const rg = this.ws?.getRange(address);
        rg?.load('values');
        await this.context?.sync();
        console.log(rg?.values);
    }
    getWsInfo() {
        const promise = new Promise((resolve) => {
            getWsInfo(this.wsName).then((data: any) => {
                resolve(data);
            })
        })
        return promise;
    }
}
