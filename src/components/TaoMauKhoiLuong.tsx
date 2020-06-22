import React, { Component } from "react";
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ws } from "../api/nvExcel";
import { NvDefButton } from "./nvButton";
import {
	BANG_CONG_TRINH,
	BANG_TONG_HOP_VAT_TU,
	BANG_HAO_PHI_VAT_TU
} from "../constants/named";
import { MAU_KHOI_LUONG, TONG_HOP_KHOI_LUONG_HEADER, KHOI_LUONG_DEFAULT_VALUES } from "../constants/values";
import socket from "../socket";

export interface AppProps {
}
export interface AppStates {
	pageSize: string;
	orientation: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean;
	id: string | undefined;
	tenBophan: string | undefined;
	data: string | undefined;
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class TaoMauKhoiLuong extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			pageSize: 'a3',
			orientation: 'portrait',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false,
			id: undefined,
			tenBophan: undefined,
			data: undefined
		}
	}
	componentDidMount() {
		socket.emit('hello', (data: any) => {
			console.log(data);

		});
	}
	_formatPage = async () => {
		console.log(ws);
		await ws?.currentWs(BANG_CONG_TRINH)
		console.log(ws);


	}
	async _formatCongTrinh() {
		await ws?.currentWs(BANG_CONG_TRINH)
		await ws?.setFont('Times New Roman', `A1:Z${ws.lastRow.row}`);
		ws?.mergeCells('A1:Z1')
		ws?.mergeCells('A2:Z2')
		ws?.mergeCells('A3:Z3')
		ws?.rowsHeight('A3', 0)
		ws?.getValues('A1:A2');
		ws?.setPrintArea('A:W');
		ws?.setBlackAndWhite();
		ws?.setPaperType('a4');
		ws?.setOrientation('landscape');
		ws?.setPageZoom(1);
		ws?.setPageMargin(50, 40, 40, 40);
		ws?.setCenter(true);
	}
	tenBoPhan_change = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string | undefined): void => {
		this.setState({ tenBophan: newText })
	};

	_submit = async () => {
		await ws?.getActive();
		console.log(ws?.lastRow.row);
		const val = await ws?.getFomulas(`A6:J${ws?.lastRow.row}`);
		socket.emit('elog', val)
	}
	_taoBangmau = async () => {
		await ws?.addSheet('Mẫu khối lượng');
		await ws?.currentWs('Mẫu khối lượng');
		await ws?.activate();
		ws?.addValues('A1:A3', MAU_KHOI_LUONG);
		ws?.addValues('A5:J5', TONG_HOP_KHOI_LUONG_HEADER);
		await ws?.createTable('A5:J5', 'mau_tong_hop_khoi_luong', KHOI_LUONG_DEFAULT_VALUES);
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
		await ws?.setFont('Times New Roman', `A:J`);
	}

	render() {
		return (
			<section className="ms-Grid">
				<Separator>Mẫu tổng hợp khối lượng</Separator>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg12 mt-8">
						<Stack className="btn-container" horizontal>
							<NvDefButton text="Sửa mẫu có sẵn" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Khởi tạo bảng mẫu" onClick={this._taoBangmau} isLoading={false} />
							<Toggle className="mt-8"
								defaultChecked={this.state.isSetFont}
								onText="Ẩn cột vật tư trong bảng công trình"
								offText="Ẩn cột vật tư trong bảng công trình"
								onChange={(_e, checked) => this.setState({ isSetFont: checked || false })} />
							<TextField label="Tên bộ phận" multiline rows={3} onChange={this.tenBoPhan_change} />
							<NvDefButton text="Tạo mẫu khối lượng" onClick={this._submit} isLoading={false} />
						</Stack>
					</div>
				</div>
			</section>
		);
	}
};
export default TaoMauKhoiLuong