import React, { Component } from "react";
import { Select, Form, Input, Button, Tabs, AutoComplete, message, Empty, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ws } from "../api/nvExcel";
import { initBangKhoiLuong } from "../api/libKhoiLuong";
import {
	MAU_KHOI_LUONG_NAME,
} from "../constants/named";
// import { MAU_KHOI_LUONG, TONG_HOP_KHOI_LUONG_HEADER, KHOI_LUONG_DEFAULT_VALUES } from "../constants/values";
import socket from "../socket";
import MauKhoiLuongContext from "../contexts/MauKhoiLuongContext";

export interface AppProps {
	formRef: any
}
export interface AppStates {
	wsExits: boolean;
	selectedTabKey: string;
	pageSize: string;
	orientation: string;
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
			pageSize: 'a3',
			orientation: 'portrait',
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
		socket.emit('khoiluong/mau/getLoaiCongTrinh', (data: any) => this.setState({ lstLoaiCongTrinh: data }))
	}
	_taoBangmau = async () => {
		await ws?.addSheet(MAU_KHOI_LUONG_NAME);
		await ws?.currentWs(MAU_KHOI_LUONG_NAME);
		await ws?.activate();
		await initBangKhoiLuong();
		this.setState({ wsExits: true })
		ws?.addValues('A6', [['HM']])
		ws?.addValues('A7', [['#']])
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
			socket.emit('khoiluong/mau/add', data, () => {
				this.formRef.current?.resetFields();
				message.success('Đã lưu mẫu khối lượng thành công');
				ws.clearValues(`A7:J${lastRow.cell1.row}`)
			});
		} else {
			data.id = values.id
			socket.emit('khoiluong/mau/update', data, () => {
				this.formRef.current?.resetFields();
				message.success('Đã lưu mẫu khối lượng thành công');
				ws.clearValues(`A7:J${lastRow.cell1.row}`)
			});
		}
	}
	_selectLoaiCongTrinh(value: string) {
		socket.emit('khoiluong/mau/getlistMauKhoiLuong', value, (data: any) => {
			if (data) {
				console.log(data);
				this.setState({ lstMauKhoiLuong: data })
			}
		})
	}
	async _selectMauKhoiLuong(value: string) {
		// await ws?.currentWs(MAU_KHOI_LUONG_NAME);
		const lastRow = await ws.getLastRow();
		ws.clearValues(`A6:J${lastRow.cell1.row}`);
		socket.emit('khoiluong/mau/get', value, (mkl: any) => {
			if (mkl) {
				const data: any[][] = JSON.parse(mkl.data)
				var addr = `A7:J${data.length + 6}`;
				ws?.addValues('A6', [['HM']])
				ws?.addValues('A7', [['#']])
				ws?.addValues(addr, data)
				this.setState({tenBophan: mkl.tenBoPhan})
				this.formRef.current?.setFieldsValue({ tenBoPhan: mkl.tenBoPhan })
			}
		})
	}

	render() {
		const { TabPane } = Tabs;
		return (
			<MauKhoiLuongContext.Provider value={{}}>
				<MauKhoiLuongContext.Consumer>
					{() =>
						<section>
							<div hidden={this.state.wsExits} style={{ margin: 'auto' }}>
								<Empty
									style={{
										paddingTop: 60,
										paddingBottom: 60
									}}
									image="assets/empty.svg"
									imageStyle={{
										height: 60,
									}}
									description={
										<span>
											Chưa có Sheet Mẫu khối lượng
										</span>
									}
								>
									<Button type="primary" onClick={this._taoBangmau}>Khởi tạo</Button>
								</Empty>
							</div>
							<Tabs
								hidden={!this.state.wsExits}
								defaultActiveKey={this.state.selectedTabKey}
								onChange={(key) => this.setState({ selectedTabKey: key })}>
								<TabPane tab="Tạo mới" key="create">
									<Form ref={this.formRef} onFinish={this._onFinish}>
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
					}
				</MauKhoiLuongContext.Consumer>
			</MauKhoiLuongContext.Provider>

		);
	}
};
export default TaoMauKhoiLuong