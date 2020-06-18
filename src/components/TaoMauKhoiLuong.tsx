import React, { Component } from "react";
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ws } from "../api/nvExcel";
import { NvDefButton } from "./nvButton";
import { 
	BANG_CONG_TRINH,
	BANG_TONG_HOP_VAT_TU,
	BANG_HAO_PHI_VAT_TU
} from "../constants/named";

export interface AppProps {
}
export interface AppStates {
	pageSize: string;
	orientation: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean;
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
			isSetFont: false
		}
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
	async _formatTongHopVatTu() {
		await ws?.currentWs(BANG_TONG_HOP_VAT_TU)
		ws?.setPrintArea('A:P');
		ws?.setFont('Times New Roman');
		ws?.setBlackAndWhite();
		ws?.setPaperType('a4');
		ws?.setOrientation('portrait');
		ws?.setPageZoom(1);
		ws?.setPageMargin(49, 40, 50, 40);
		ws?.setCenter(true);
		ws?.colWidth('B', 0);
		ws?.colWidth('J', 0);
		ws?.colWidth('E', 86)
		ws?.colWidth('O', 86)
		ws?.colWidth('P', 86)
		ws?.rowsHeight(`A1:A3`, 18)
		ws?.autoRowsHeight(`A5:A${ws.lastRow.row}`)
		ws?.verCenter(`A4:P${ws.lastRow.row}`)
		ws?.unmergeCells('A3:R3');
		await ws?.moveRange('A3', 'U3');
		await ws?.moveRange('A4:R4', 'A3:R3')
	}
	async _formatHaoPhiVatTu() {
		await ws?.currentWs(BANG_HAO_PHI_VAT_TU)
		ws?.setPrintArea('A:P');
		ws?.setFont('Times New Roman');
		ws?.setBlackAndWhite();
		ws?.setPaperType('a4');
		ws?.setOrientation('portrait');
		ws?.setPageZoom(1);
		ws?.setPageMargin(49, 40, 50, 40);
		ws?.setCenter(true);
		ws?.colWidth('B', 0);
		ws?.colWidth('J', 0);
		ws?.colWidth('E', 86)
		ws?.colWidth('O', 86)
		ws?.colWidth('P', 86)
		ws?.rowsHeight(`A1:A${ws.lastRow.row}`, 18)
		ws?.verCenter(`A4:P${ws.lastRow.row}`)
	}
	render() {
		return (
			<section className="ms-Grid">
				<Separator>Mẫu tổng hợp khối lượng</Separator>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg12 mt-8">
						<Stack className="btn-container" horizontal>
							<NvDefButton text="Sửa mẫu có sẵn" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng công trình" onClick={this._formatCongTrinh} isLoading={false} />
							<NvDefButton text="Bảng tổng hợp vật tư" onClick={this._formatTongHopVatTu} isLoading={false} />
							<NvDefButton text="Bảng hao phí vật tư" onClick={this._formatHaoPhiVatTu} isLoading={false} />
							<NvDefButton text="Bảng giá tháng" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng chiết tính" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng dự thầu" onClick={this._formatPage} isLoading={false} />
							<Toggle className="mt-8" 
								defaultChecked={this.state.isSetFont} 
								onText="Ẩn cột vật tư trong bảng công trình" 
								offText="Ẩn cột vật tư trong bảng công trình" 
								onChange={(_e, checked) => this.setState({isSetFont: checked || false})} />
						</Stack>
					</div>
				</div>
			</section>
		);
	}
};
export default TaoMauKhoiLuong