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

	_submit = () => {
		console.log(this.state);
		
	}
	_taoBangmau = async () => {
		await ws?.addSheet('Mẫu khối lượng');
		await ws?.currentWs('Mẫu khối lượng');
		await ws?.activate();

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