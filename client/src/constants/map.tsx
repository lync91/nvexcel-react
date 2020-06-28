import { MAU_KHOI_LUONG_NAME, TIEN_LUONG_SHEET_NAME } from "./named";
import history from "../history";
export class sheetMap {
    data: any = {};
    constructor() {
        this.data[MAU_KHOI_LUONG_NAME] = '/TaoMauKhoiLuong'
        this.data[TIEN_LUONG_SHEET_NAME] = '/TienLuong'
    }
    navigate (address: string) {
        if(this.data[address]) {
            history.push(this.data[address])
        }
    }
}