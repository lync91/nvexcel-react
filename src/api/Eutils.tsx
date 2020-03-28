import { AsyncConstructor } from 'async-constructor';
import { getPageType, getOrientationType } from "./mapIndex";
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
    row: string
}

// export function addressParse(txt:string): addressTypes {
//     const data: addressTypes = {
//         text: '',
//         col: '',
//         row: 1
//     }
//     data.text = txt.replace(/(([^!]+)?)!/g, '')
//     console.log(data);


//     return data;
// }

export class addressObj {
    sheet!: string;
    text!: string;
    cell1: addressTypes = {
        text: "",
        col: "",
        row: ""
    };
    cell2: addressTypes = {
        text: "",
        col: "",
        row: ""
    }
    constructor(txt: string) {
        this.text = txt.replace(/(([^!]+)?)!/g, '');
        const t = this.text.split(":")
        this.cell1.text = t[0];
        this.cell1.col = t[0].replace(/([0-9])+/g, "");
        this.cell1.row = t[0].replace(/([A-Z]|[a-z])+/g, "");
        if (t[1]) {
            this.cell2.text = t[1];
            this.cell2.col = t[1].replace(/([0-9])+/g, "");
            this.cell2.row = t[1].replace(/([A-Z]|[a-z])+/g, "");
        }
    }
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
export class wsObject extends AsyncConstructor {
    ws: Excel.Worksheet | null = null;
    context: Excel.RequestContext | null = null;
    static init() {
        throw new Error("Method not implemented.");
    }
    wsName: string | null = null;
    name!: string;
    lastCol!: addressTypes;
    lastRow!: addressTypes;
    selectedRange!: string;
    constructor(wsName: string | null = null) {
        super(async () => {
            this.wsName = wsName;
            try {
                await Excel.run(async context => {
                    let ws: Excel.Worksheet = context.workbook.worksheets.getActiveWorksheet()
                    wsName ? ws = context.workbook.worksheets.getItem(wsName)
                        : ws = context.workbook.worksheets.getActiveWorksheet();
                    this.ws = ws;
                    const rg = context.workbook.getSelectedRange();
                    rg.load('address')
                    ws.load('name');
                    const lastRow: Excel.Range = getLastRow(ws);
                    const lastCol: Excel.Range = getLastCol(ws);
                    lastRow.load('address');
                    lastCol.load('address');
                    await context.sync();
                    const lastcolAd = new addressObj(lastCol.address);
                    const lastrowAd = new addressObj(lastCol.address);
                    this.lastCol = lastcolAd.cell1;
                    this.lastRow = lastrowAd.cell1;
                    this.name = ws.name;
                    this.context = context;
                    this.selectedRange = rg.address;
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
    async setPrintAreabySelected() {
        this.ws?.pageLayout.setPrintArea(this.selectedRange)
    }
    async autoSetPrintArea() {
        this.ws?.pageLayout.setPrintArea("A:" + this.lastCol.col)
    }
    async setFont(fontName: string) {
        const rg = this.ws?.getRange('A:ZZ')
        rg!.format.font.name = fontName;
    }
    async setBlackAndWhite() {
        this.ws!.pageLayout.blackAndWhite = true;
    }
    async setPageMargin(top: number, bottom: number, left: number, right: number) {
        this.ws!.pageLayout.topMargin = top;
        this.ws!.pageLayout.bottomMargin = bottom;
        this.ws!.pageLayout.leftMargin = left;
        this.ws!.pageLayout.rightMargin = right;
    }
    async setPaperType(paperType: string) {
        this.ws!.pageLayout.paperSize = getPageType(paperType)
    }
    async setOrientation(ori: string) {
        this.ws!.pageLayout.orientation = getOrientationType(ori)
    }
}
