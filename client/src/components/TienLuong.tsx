import React, { Component } from "react";
import { 
	Select, 
	Form, 
	Input, 
	Button, 
	Tabs, 
	AutoComplete, 
	message, 
	Empty, 
	List, 
	Skeleton, 
	Avatar } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ws } from "../api/nvExcel";
import { initBangTienLuong } from "../api/libKhoiLuong";
import {
	TIEN_LUONG_SHEET_NAME,
} from "../constants/named";
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
	data: any[] | undefined;
	field: any,
	lstLoaiCongTrinh: any[],
	initLoading: boolean,
	loading: boolean,
	list: any[],
	lstMauKhoiLuong: any[];
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
			field: {},
			lstLoaiCongTrinh: [],
			initLoading: true,
			loading: false,
			data: [],
			list: [],
			lstMauKhoiLuong: [],
		}
	}

	formRef = React.createRef<FormInstance>();

	async prepair() {
		const name = await ws?.checkWsExits(TIEN_LUONG_SHEET_NAME)
		// name ? this.setState({ wsExits: true }) : this.setState({ wsExits: false })
		if (name) {
			await ws?.currentWs(TIEN_LUONG_SHEET_NAME)
			ws?.activate();
			this.setState({ wsExits: true })
		} else {
			this.setState({ wsExits: false })
		}
	}

	componentDidMount() {
		this.prepair()
		socket.emit('khoiluong/mau/getLoaiCongTrinh', (data: any) => this.setState({lstLoaiCongTrinh: data}))
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
	_selectLoaiCongTrinh(value: string) {
		console.log(value);
		socket.emit('khoiluong/mau/getlistMauKhoiLuong', value, (data: any) => {
			if (data) {
				this.setState({ lstMauKhoiLuong: data, initLoading: false })
			}
		})
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
		socket.emit('khoiluong/mau/add', data, () => {
			this.formRef.current?.resetFields();
			message.success('Đã lưu mẫu khối lượng thành công');
		});
	}

	render() {
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
					<TabPane tab="Menu" key="1">
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
					<TabPane tab="Thư viện" key="2">
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
							{/* <Form.Item label='Tên bộ phận' name='tenBoPhan' >
								<Input />
							</Form.Item> */}
						</Form>
						<List
							className="demo-loadmore-list"
							size="small"
							loading={this.state.initLoading}
							itemLayout="horizontal"
							bordered={true}
							dataSource={this.state.lstMauKhoiLuong}
							renderItem={item => (
							<List.Item
								actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
							>
								<Skeleton avatar title={false} loading={item.loading} active>
								<List.Item.Meta
									title={item.label}
								/>
								</Skeleton>
							</List.Item>
							)}
						/>
					</TabPane>
					<TabPane tab="Tra định mức" key="3">
						
					</TabPane>
				</Tabs>
			</section>
		);
	}
};
export default TienLuong