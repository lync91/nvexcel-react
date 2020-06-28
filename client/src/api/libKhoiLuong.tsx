import { ws } from "./nvExcel";
import { MAU_KHOI_LUONG, TONG_HOP_KHOI_LUONG_HEADER, KHOI_LUONG_DEFAULT_VALUES, TIEN_LUONG_TITLE } from "../constants/values";
import { MAU_KHOI_LUONG_TABLE_NAME, TIEN_LUONG_TABLE_NAME } from "../constants/named";
export async function initBangKhoiLuong(values: any[][] | undefined = undefined) {
	ws?.addValues('A1:A3', MAU_KHOI_LUONG);
	ws?.addValues('A5:J5', TONG_HOP_KHOI_LUONG_HEADER);
	// values? await ws?.createTable('A5:J5', MAU_KHOI_LUONG_TABLE_NAME, values) : await ws?.createTable('A5:J5', MAU_KHOI_LUONG_TABLE_NAME, KHOI_LUONG_DEFAULT_VALUES);
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="Ký hiệu", INDIRECT("RC[-1]",0)="Ký hiệu", INDIRECT("RC[-2]",0)="Ký hiệu", INDIRECT("RC[-3]",0)="Ký hiệu", INDIRECT("RC[-4]",0)="Ký hiệu", INDIRECT("RC[-5]",0)="Ký hiệu", INDIRECT("RC[-6]",0)="Ký hiệu", INDIRECT("RC[-7]",0)="Ký hiệu", INDIRECT("RC[-8]",0)="Ký hiệu", INDIRECT("RC[-9]",0)="Ký hiệu"),TRUE)', null, true, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="HM", INDIRECT("RC[-1]",0)="HM", INDIRECT("RC[-2]",0)="HM", INDIRECT("RC[-3]",0)="HM", INDIRECT("RC[-4]",0)="HM", INDIRECT("RC[-5]",0)="HM", INDIRECT("RC[-6]",0)="HM", INDIRECT("RC[-7]",0)="HM", INDIRECT("RC[-8]",0)="HM", INDIRECT("RC[-9]",0)="HM"),TRUE)', null, true, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="#", INDIRECT("RC[-1]",0)="#", INDIRECT("RC[-2]",0)="#", INDIRECT("RC[-3]",0)="#", INDIRECT("RC[-4]",0)="#", INDIRECT("RC[-5]",0)="#", INDIRECT("RC[-6]",0)="#", INDIRECT("RC[-7]",0)="#", INDIRECT("RC[-8]",0)="#", INDIRECT("RC[-9]",0)="#"),TRUE)', null, true, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="+", INDIRECT("RC[-1]",0)="+", INDIRECT("RC[-2]",0)="+", INDIRECT("RC[-3]",0)="+", INDIRECT("RC[-4]",0)="+", INDIRECT("RC[-5]",0)="+", INDIRECT("RC[-6]",0)="+", INDIRECT("RC[-7]",0)="+", INDIRECT("RC[-8]",0)="+", INDIRECT("RC[-9]",0)="+"),TRUE)', null, false, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="-", INDIRECT("RC[-1]",0)="-", INDIRECT("RC[-2]",0)="-", INDIRECT("RC[-3]",0)="-", INDIRECT("RC[-4]",0)="-", INDIRECT("RC[-5]",0)="-", INDIRECT("RC[-6]",0)="-", INDIRECT("RC[-7]",0)="-", INDIRECT("RC[-8]",0)="-", INDIRECT("RC[-9]",0)="-"),TRUE)', 'blue', false, false, true)
	// ws?.setCustomConditionalFormat('B:B', '=IF(INDIRECT("RC[-1]",0)="+", TRUE)', null, false, false, false);
	ws?.setWrapText('A:J')
	ws?.colWidth('A', 30);
	ws?.colWidth('B', 30);
	ws?.colWidth('C', 60);
	ws?.colWidth('D', 180);
	ws?.colWidth('E', 50);
	ws?.colWidth('F', 40);
	ws?.colWidth('G', 40);
	ws?.colWidth('H', 150);
	ws?.colWidth('I', 80);
	ws?.colWidth('J', 80);
	ws?.verCenter('A:J');
	ws?.horCenter('A1:J5');
	ws?.horCenter('A1:C1000');
	ws?.horCenter('E1:G1000');
	ws?.mergeCells('A1:J1');
	ws?.mergeCells('A2:J2');
	ws?.mergeCells('A3:J3');
	ws?.setBold('A1:J3');
	ws?.rowsHeight('A1:J3', 22)
	await ws?.setFont('Times New Roman', `A:J`);
}

export async function initBangTienLuong() {
	ws?.addValues('A1:A3', TIEN_LUONG_TITLE);
	ws?.addValues('A5:J5', TONG_HOP_KHOI_LUONG_HEADER);
	// await ws?.createTable('A5:J5', 'mau_tong_hop_khoi_luong', KHOI_LUONG_DEFAULT_VALUES);
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="Ký hiệu", INDIRECT("RC[-1]",0)="Ký hiệu", INDIRECT("RC[-2]",0)="Ký hiệu", INDIRECT("RC[-3]",0)="Ký hiệu", INDIRECT("RC[-4]",0)="Ký hiệu", INDIRECT("RC[-5]",0)="Ký hiệu", INDIRECT("RC[-6]",0)="Ký hiệu", INDIRECT("RC[-7]",0)="Ký hiệu", INDIRECT("RC[-8]",0)="Ký hiệu", INDIRECT("RC[-9]",0)="Ký hiệu"),TRUE)', null, true, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="HM", INDIRECT("RC[-1]",0)="HM", INDIRECT("RC[-2]",0)="HM", INDIRECT("RC[-3]",0)="HM", INDIRECT("RC[-4]",0)="HM", INDIRECT("RC[-5]",0)="HM", INDIRECT("RC[-6]",0)="HM", INDIRECT("RC[-7]",0)="HM", INDIRECT("RC[-8]",0)="HM", INDIRECT("RC[-9]",0)="HM"),TRUE)', null, true, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="#", INDIRECT("RC[-1]",0)="#", INDIRECT("RC[-2]",0)="#", INDIRECT("RC[-3]",0)="#", INDIRECT("RC[-4]",0)="#", INDIRECT("RC[-5]",0)="#", INDIRECT("RC[-6]",0)="#", INDIRECT("RC[-7]",0)="#", INDIRECT("RC[-8]",0)="#", INDIRECT("RC[-9]",0)="#"),TRUE)', null, true, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="+", INDIRECT("RC[-1]",0)="+", INDIRECT("RC[-2]",0)="+", INDIRECT("RC[-3]",0)="+", INDIRECT("RC[-4]",0)="+", INDIRECT("RC[-5]",0)="+", INDIRECT("RC[-6]",0)="+", INDIRECT("RC[-7]",0)="+", INDIRECT("RC[-8]",0)="+", INDIRECT("RC[-9]",0)="+"),TRUE)', null, false, false, true)
	ws?.setCustomConditionalFormat('A:J', '=IF(OR(INDIRECT("RC[0]",0)="-", INDIRECT("RC[-1]",0)="-", INDIRECT("RC[-2]",0)="-", INDIRECT("RC[-3]",0)="-", INDIRECT("RC[-4]",0)="-", INDIRECT("RC[-5]",0)="-", INDIRECT("RC[-6]",0)="-", INDIRECT("RC[-7]",0)="-", INDIRECT("RC[-8]",0)="-", INDIRECT("RC[-9]",0)="-"),TRUE)', 'blue', false, false, true)
	// ws?.setCustomConditionalFormat('B:B', '=IF(INDIRECT("RC[-1]",0)="+", TRUE)', null, false, false, false);
	ws?.setWrapText('A:J')
	ws?.colWidth('A', 30);
	ws?.colWidth('B', 30);
	ws?.colWidth('C', 60);
	ws?.colWidth('D', 180);
	ws?.colWidth('E', 50);
	ws?.colWidth('F', 40);
	ws?.colWidth('G', 60);
	ws?.colWidth('H', 150);
	ws?.colWidth('I', 80);
	ws?.colWidth('J', 80);
	ws?.verCenter('A:J');
	ws?.horCenter('A1:J5');
	ws?.horCenter('A1:C1000');
	ws?.horCenter('E1:G1000');
	ws?.mergeCells('A1:J1');
	ws?.mergeCells('A2:J2');
	ws?.mergeCells('A3:J3');
	ws?.setBold('A1:J3');
	ws?.rowsHeight('A1:J3', 22)
	await ws?.setFont('Times New Roman', `A:J`);
}