import { MAU_KHOI_LUONG_NAME } from "./named";
import history from "../history";
export class sheetMap {
    data: any = {};
    constructor() {
        this.data[MAU_KHOI_LUONG_NAME] = '/TaoMauKhoiLuong'
    }
    navigate (address: string) {
        if(this.data[address]) {
            history.push(this.data[address])
        }
    }
}