import React, { Component, useRef } from "react";
import { Select, Form, Input, Button, Checkbox, Tabs, AutoComplete, message, Empty } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ws, init } from "../api/nvExcel";
import { initBangTienLuong } from "../api/libKhoiLuong";
import {
	BANG_CONG_TRINH,
	BANG_TONG_HOP_VAT_TU,
	BANG_HAO_PHI_VAT_TU,
	TIEN_LUONG_SHEET_NAME,
} from "../constants/named";
import { MAU_KHOI_LUONG, TONG_HOP_KHOI_LUONG_HEADER, KHOI_LUONG_DEFAULT_VALUES } from "../constants/values";
import socket from "../socket";



export interface AppProps {
	formRef: any
}
export interface AppStates {
	wsExits: boolean;
	pageSize: string;
	orientation: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean;
	id: string | undefined;
	loaiCongTrinh: string | undefined;
	tenBophan: string | undefined;
	data: string | undefined;
	field: any
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class TienLuong extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			wsExits: false,
			pageSize: 'a3',
			orientation: 'portrait',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false,
			id: undefined,
			loaiCongTrinh: undefined,
			tenBophan: undefined,
			data: undefined,
			field: {}
		}
	}

	formRef = React.createRef<FormInstance>();

	async prepair() {
		ws?.checkWsExits(TIEN_LUONG_SHEET_NAME)
			.then(name => {
				console.log(name);
				name ? this.setState({ wsExits: true }) : this.setState({ wsExits: false })
			})
	}

	componentDidMount() {
		this.prepair()
		socket.emit('khoiluong/mau/getLoaiCongTrinh', (data: any) => console.log(data))
	}
	_taoBangmau = async () => {
		await ws?.addSheet(TIEN_LUONG_SHEET_NAME);
		await ws?.currentWs(TIEN_LUONG_SHEET_NAME);
		await ws?.activate();
		initBangTienLuong();
		this.setState({ wsExits: true })
		ws?.addValues('A6', [['HM']])
		ws?.addValues('A7', [['#']])
	}
	_onFinish = async (values: any) => {
		console.log(values);
		await ws?.getActive();
		const val = await ws?.getFomulas(`A7:J${ws?.lastRow.row}`);
		const data = {
			tenBoPhan: values.tenBoPhan,
			data: JSON.stringify(val),
			loaiCongTrinh: values.loaiCongTrinh
		}
		socket.emit('khoiluong/mau/add', data, (res: any) => {
			this.formRef.current?.resetFields();
			message.success('Đã lưu mẫu khối lượng thành công');
		});
	}

	render() {
		const { TextArea } = Input;
		const { TabPane } = Tabs;
		return (
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
				<Tabs hidden={!this.state.wsExits} defaultActiveKey="1">
					<TabPane tab="Tạo mới" key="1">
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
					<TabPane tab="Sửa mẫu" key="2">
						<Form ref={this.formRef} onFinish={this._onFinish}>
							<Form.Item label='Loại công trình' name='loaiCongTrinh'>
							<Select
								showSearch
								placeholder="Select a person"
								optionFilterProp="children"
								filterOption={(input, option) =>
								option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
							</Select>
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
				</Tabs>
			</section>
		);
	}
};
export default TienLuong