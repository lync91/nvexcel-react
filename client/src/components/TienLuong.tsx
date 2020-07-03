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
	Avatar,

} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { FormInstance } from 'antd/lib/form';
import { ws, ee } from "../api/nvExcel";
import { initBangTienLuong } from "../api/libKhoiLuong";
import {
	TIEN_LUONG_SHEET_NAME,
} from "../constants/named";
import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";
import socket from "../socket";

const formRef = React.createRef<FormInstance>();

ee.on(`${WORKSHEET_SELECTION_CHANGED}_${ws?.projectInfo[TIEN_LUONG_SHEET_NAME]}`, async (address) => {
	const value = await ws.getValues(address)
	formRef.current?.setFieldsValue({search: value})
})

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
	lstKV: any[];
	lstDM: any[]
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
			lstKV: [],
			lstDM: []
		}
		
	}

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
		socket.emit('khoiluong/mau/getLoaiCongTrinh', (data: any) => this.setState({ lstLoaiCongTrinh: data }));
		socket.emit('dutoan/dongia/getkv', (data: any) => this.setState({ lstKV: data }))
		
	}
	_taoBangmau = async () => {
		await ws?.addSheet(TIEN_LUONG_SHEET_NAME);
		const id =  await ws?.currentWs(TIEN_LUONG_SHEET_NAME);
		ws.updateProjectInfo(TIEN_LUONG_SHEET_NAME, id);
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
		console.log('OK');
		
		// console.log(values);
		// await ws?.getActive();
		// const val = await ws?.getFomulas(`A7:J${ws?.lastRow.row}`);
		// const data = {
		// 	tenBoPhan: values.tenBoPhan,
		// 	data: JSON.stringify(val),
		// 	loaiCongTrinh: values.loaiCongTrinh
		// }
		// socket.emit('khoiluong/mau/add', data, () => {
		// 	formRef.current?.resetFields();
		// 	message.success('Đã lưu mẫu khối lượng thành công');
		// });
		// await ws.setPropeties();
		ws.getPropeties()
	}

	async _mcvClick(value: any) {
		console.log(value);
		// ws.insertRange('A7:A10')
		const addr1 = await ws.getSelectedAddress()
		console.log(addr1);
		if (addr1.cell1.row! > 7) {
			socket.emit('khoiluong/mau/get', value, async (mkl: any) => {
				if (mkl) {
					const data: any[][] = JSON.parse(mkl.data)
					var addr = `A${addr1.cell1.row}:J${data.length + addr1.cell1.row! - 1}`;
					await ws.insertRange(addr);
					ws?.addValues(addr, data);
				}
			})
		}

	}
	async _selectKhuvuc(value: any) {
		socket.emit('dutoan/dongia/getdm', value, (data: any) => this.setState({ lstDM: data }))
	}

	async _selectDinhMuc(value: any) {
		console.log(value);

	}

	render() {
		const { TabPane } = Tabs;
		const {Search} = Input
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
						<Form ref={formRef} onFinish={this._onFinish}>
							<Form.Item label='Loại công trình' name='loaiCongTrinh'>
								<AutoComplete />
							</Form.Item>
							<Form.Item label='Tên bộ phận' name='tenBoPhan' >
								<Input />
							</Form.Item>
							<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
								<Button type="primary" htmlType="submit" onClick={this._onFinish}>
									Lưu
								</Button>
							</Form.Item>
						</Form>
					</TabPane>
					<TabPane tab="Thư viện" key="2">
						<Form ref={formRef} onFinish={this._onFinish}>
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
								<List.Item>
									<Skeleton avatar title={false} loading={item.loading} active>
										<List.Item.Meta
											title={item.label}
										/>
										<Button type="primary" shape="circle" size="small" onClick={e => this._mcvClick(item.value)} icon={<PlusOutlined />} />
									</Skeleton>
								</List.Item>
							)}
						/>
					</TabPane>
					<TabPane tab="Tra định mức" key="3">
						<Form ref={formRef} onFinish={this._onFinish}>
							<Form.Item label='Khu vực' name='khuVuc'>
								<Select
									showSearch
									options={this.state.lstKV}
									placeholder="Chọn khu vực"
									optionFilterProp="children"
									onSelect={(val: string) => this._selectKhuvuc(val)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item label='Đơn giá' name='donGia' >
								<Select
									showSearch
									mode="multiple"
									options={this.state.lstDM}
									placeholder="Chọn đơn giá"
									optionFilterProp="children"
									onSelect={(val: string) => this._selectDinhMuc(val)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item label='Tìm kiếm' name='search' >
								<Search placeholder="Tìm kiếm mã hiệu, công tác" onSearch={value => console.log(value)} enterButton />
							</Form.Item>
						</Form>
					</TabPane>
				</Tabs>
			</section>
		);
	}
};
export default TienLuong