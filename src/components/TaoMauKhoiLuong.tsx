import React, { Component } from "react";
import { Select, Form, Input, Button, Checkbox, Tabs } from 'antd';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ws, init } from "../api/nvExcel";
import { NvDefButton } from "./nvButton";
import { initBangKhoiLuong } from "../api/libKhoiLuong";
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
		console.log(this.state.tenBophan);

	};

	_submit = async () => {
		await ws?.getActive();
		console.log(ws?.lastRow.row);
		const val = await ws?.getFomulas(`A7:J${ws?.lastRow.row}`);
		const data = {
			tenBoPhan: this.state.tenBophan,
			data: JSON.stringify(val)
		}
		socket.emit('khoiluong/mau/add', data, (res: any) => {
			this.setState({ tenBophan: '123' });
		})
	}
	_taoBangmau = async () => {
		await ws?.addSheet('Mẫu khối lượng');
		await ws?.currentWs('Mẫu khối lượng');
		await ws?.activate();
		initBangKhoiLuong();
	}

	render() {
		const { TextArea } = Input;
		const { TabPane } = Tabs;
		return (
			<section>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Tạo mới" key="1">
						<Form>
							<Form.Item>
								<TextArea />
							</Form.Item>
							<Form.Item>
								<Button type="primary" style={{ marginLeft: 8 }}>
									Primary Button
								</Button>
							</Form.Item>
						</Form>
					</TabPane>
					<TabPane tab="Sửa mẫu" key="2">
						<Form>
							<Form.Item>
								<TextArea />
							</Form.Item>
							<Form.Item>
								<Button type="primary" style={{ marginLeft: 8 }}>
									Primary Button
								</Button>
							</Form.Item>
						</Form>
					</TabPane>
				</Tabs>

			</section>
		);
	}
};
export default TaoMauKhoiLuong