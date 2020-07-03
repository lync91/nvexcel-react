import { ws } from './nvExcel';
import { addressObj } from './Eutils'
import { MAU_KHOI_LUONG_NAME, TIEN_LUONG_SHEET_NAME } from "../constants/named";
import { isString } from 'util';
import { AUTO_STT_FOMULA } from "../constants/values";
import { evaluate, parse } from "mathjs";
import { EventEmitter } from "events";
export function sheetChanged (event: any) {
    switch (ws.name) {
        case MAU_KHOI_LUONG_NAME:
            mklChanged(event)
            break;
        case TIEN_LUONG_SHEET_NAME:
            tlChanged(event)
            break;
    
        default:
            break;
    }
}
const mklChanged = (e: any) => {
    const addr = new addressObj(e.address);
    if (addr.cell1.col === 'A' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        ws.addValues(`B${addr.cell1.row}`, [[AUTO_STT_FOMULA]])
    }
    if (addr.cell1.col === 'H' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        const res = evaluate(e.details!.valueAfter);
        if (res) {
            ws.addValues(`I${addr.cell1.row}`, [[res]])
        }
    }
}
const tlChanged = (e: any) => {
    console.log(e);
    const addr = new addressObj(e.address);
    if (addr.cell1.col === 'A' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        ws.addValues(`B${addr.cell1.row}`, [[AUTO_STT_FOMULA]])
    }
    if (addr.cell1.col === 'H' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        const res = evaluate(e.details!.valueAfter);
        if (res) {
            ws.addValues(`I${addr.cell1.row}`, [[res]])
        }
    }
}