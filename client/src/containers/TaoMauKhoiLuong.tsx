import React, { Component } from "react";
import { Select, Form, Input, Button, Tabs, AutoComplete, message, Empty, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ws } from "../api/nvExcel";
import NoSheet from "../components/NoSheet";
import { initBangKhoiLuong } from "../api/libKhoiLuong";
import {
	MAU_KHOI_LUONG_NAME
} from "../constants/named";
import { tbBANGTONGHOPKHOILUONG } from "../constants/templates";
// import { MAU_KHOI_LUONG, TONG_HOP_KHOI_LUONG_HEADER, KHOI_LUONG_DEFAULT_VALUES } from "../constants/values";
// import socket from "../socket";
import MauKhoiLuongContext from "../contexts/MauKhoiLuongContext";

const formRef = React.createRef<FormInstance>();

export interface AppProps {
	formRef: any
}
export interface AppStates {
	wsExits: boolean;
	selectedTabKey: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean;
	id: string | undefined;
	loaiCongTrinh: string | undefined;
	tenBophan: string | undefined;
	data: string | undefined;
	field: any;
	lstLoaiCongTrinh: any[];
	lstMauKhoiLuong: any[];
	isRename: boolean;
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
			wsExits: false,
			selectedTabKey: 'create',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false,
			id: undefined,
			loaiCongTrinh: undefined,
			tenBophan: undefined,
			data: undefined,
			field: {},
			lstLoaiCongTrinh: [],
			lstMauKhoiLuong: [],
			isRename: false
		}
	}

	formRef = React.createRef<FormInstance>();

	async prepair() {
		const name = await ws?.checkWsExits(MAU_KHOI_LUONG_NAME);
		name ? this.setState({ wsExits: true }) : this.setState({ wsExits: false });
		if (name) {
			console.log(name);
			await ws?.currentWs(MAU_KHOI_LUONG_NAME)
			ws?.activate()
		}
	}

	componentDidMount() {
		this.prepair()
		// socket.emit('khoiluong/mau/getLoaiCongTrinh', (data: any) => this.setState({ lstLoaiCongTrinh: data }))
	}
	_taoBangmau = async () => {
		this.setState({ wsExits: true })
		tbBANGTONGHOPKHOILUONG.name = MAU_KHOI_LUONG_NAME
		await ws?.newSheetfromObject(tbBANGTONGHOPKHOILUONG);
		const id = await ws?.currentWs(MAU_KHOI_LUONG_NAME);
		await ws.updateProjectInfo(MAU_KHOI_LUONG_NAME, id);
		await ws?.activate();
		ws?.addValues('A6', [['HM']])
		ws?.addValues('A7', [['#']])
		console.log(this.state);

	}
	_onFinish = async (values: any) => {
		await ws?.getActive();
		const lastRow = await ws.getLastRow();
		const val = await ws?.getFomulas(`A7:J${lastRow.cell1.row}`);
		const data = {
			tenBoPhan: values.tenBoPhan,
			data: JSON.stringify(val),
			loaiCongTrinh: values.loaiCongTrinh,
			id: ''
		}
		if (this.state.selectedTabKey === 'create') {
		} else {
			data.id = values.id
		}
	}
	_selectLoaiCongTrinh(value: string) {
		// socket.emit('khoiluong/mau/getlistMauKhoiLuong', value, (data: any) => {
		// 	if (data) {
		// 		console.log(data);
		// 		this.setState({ lstMauKhoiLuong: data })
		// 	}
		// })
	}
	async _selectMauKhoiLuong(value: string) {
		// await ws?.currentWs(MAU_KHOI_LUONG_NAME);
		const lastRow = await ws.getLastRow();
		ws.clearValues(`A6:J${lastRow.cell1.row}`);
		// socket.emit('khoiluong/mau/get', value, (mkl: any) => {
		// 	if (mkl) {
		// 		const data: any[][] = JSON.parse(mkl.data)
		// 		var addr = `A7:J${data.length + 6}`;
		// 		ws?.addValues('A6', [['HM']])
		// 		ws?.addValues('A7', [['#']])
		// 		ws?.addValues(addr, data)
		// 		this.setState({tenBophan: mkl.tenBoPhan})
		// 		this.formRef.current?.setFieldsValue({ tenBoPhan: mkl.tenBoPhan })
		// 	}
		// })
	}

	render() {
		const { TabPane } = Tabs;
		const { wsExits } = this.state;
		return (
			<section>
				<NoSheet wsExits={wsExits} message="Chưa có Sheet Mẫu khối lượng" onClick={() => this._taoBangmau()} />
				<Tabs
					hidden={!this.state.wsExits}
					defaultActiveKey={this.state.selectedTabKey}
					onChange={(key) => this.setState({ selectedTabKey: key })}>
					<TabPane tab="Tạo mới" key="create">
						<FormTaoMau onFinish={(values: any) => this._onFinish(values)} />
					</TabPane>
					<TabPane tab="Sửa mẫu" key="edit">
						<Form ref={this.formRef} onFinish={this._onFinish}>
							<Form.Item label='Loại công trình' name='loaiCongTrinh'>
								<Select
									showSearch
									options={this.state.lstLoaiCongTrinh}
									placeholder="Chọn loại công trình"
									optionFilterProp="children"
									onSelect={(val: string) => this._selectLoaiCongTrinh(val)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item label='Tên bộ phận' name='id' >
								<Select
									showSearch
									options={this.state.lstMauKhoiLuong}
									placeholder="Chọn mẫu khối lượng"
									optionFilterProp="children"
									onSelect={(val: string, ops) => this._selectMauKhoiLuong(val)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item name="isRename">
								<Checkbox onChange={(e) => this.setState({ isRename: e.target.checked })}>Sửa tên mẫu khối lượng</Checkbox>
							</Form.Item>
							<Form.Item name="tenBoPhan">
								<Input disabled={!this.state.isRename} placeholder="Tên bộ phận" checked={this.state.isRename} />
							</Form.Item>
							<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
								<Button type="primary" htmlType="submit">
									Lưu
										</Button>
							</Form.Item>
						</Form>
					</TabPane>
				</Tabs>
			</section>
		);
	}
};

function FormTaoMau({ onFinish }: any) {
	return (
		<Form ref={formRef} onFinish={(values: any) => onFinish(values)}>
			<Form.Item label='Loại công trình' name='loaiCongTrinh'>
				<AutoComplete />
			</Form.Item>
			<Form.Item label='Tên bộ phận' name='tenBoPhan' >
				<Input />
			</Form.Item>
			<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
				<Button type="primary" htmlType="submit">
					Lưu
			</Button>
			</Form.Item>
		</Form>
	)
}

export default TaoMauKhoiLuong