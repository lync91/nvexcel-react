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
	Table
} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { FormInstance } from 'antd/lib/form';
import { ws, ee } from "../api/nvExcel";
import { initBangTienLuong } from "../api/libKhoiLuong";
import {
	TIEN_LUONG_SHEET_NAME,
	KHU_VUC_NAME,
	DON_GIA_NAME
} from "../constants/named";
import { MAU_BANG_TRA_OBJECT } from "../constants/values";
import { listCP } from "../constants/templates"
import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";
import socket from "../socket";
import { addressObj } from "../api/Eutils";

const formRef = React.createRef<FormInstance>();

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
	listCP: any[];
	sheetHeader: any[];
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class MauBangTra extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			wsExits: false,
			pageSize: 'a3',
			orientation: 'portrait',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false,
			listCP: [],
			sheetHeader: []
		}

	}

	async prepair() {

	}

	componentDidMount() {
		this.setState({listCP: listCP.map((e: any) => {
			e.value = e.key;
			e.label = e.tencp;
			return e
		})})
		formRef.current?.setFieldsValue({vanBanCanCu: 'TT 09/2019/TT-BXD'})

	}
	_taoTaoMauBangTra = async () => {
		await ws.newSheetfromObject(MAU_BANG_TRA_OBJECT);
		this.setState({wsExits: true});
		this.setState({sheetHeader: MAU_BANG_TRA_OBJECT.contents})
	}
	_onFinish = async (values: any) => {
		ws.getPropeties();
	}

	async _mcvClick(value: any) {
		const addr1 = await ws.getSelectedAddress();
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

	async _selectLoaiCP(value: any, item: any) {
		const contents = this.state.sheetHeader.concat([{range: [{values: [item.label], bold: true}]}]).concat(item.template);
		await ws.getActive().then(async x => {
			await ws.clearValues('A1:Z50');
			console.log('contents:', contents);
			
			await ws.sheetContents(contents);
		})
		
	}

	_frmTraDinhMucChange(values: any) {
		if (values.donGia) ws.updateProjectInfo(DON_GIA_NAME, values.donGia);
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
								Chưa có Sheet Thổng hợp chi phí
							</span>
						}
					>
						<Button type="primary" onClick={this._taoTaoMauBangTra}>Khởi tạo</Button>
					</Empty>
				</div>
				<Tabs hidden={!this.state.wsExits} defaultActiveKey="1">
					<TabPane tab="Menu" key="1">
						<Form ref={formRef} onFinish={this._onFinish}>
							<Form.Item label='Văn bản căn cứ' name='vanBanCanCu'>
								<AutoComplete />
							</Form.Item>
							<Form.Item label='Loại chi phí' name='loaiCongTrinh'>
								<Select
									showSearch
									options={this.state.listCP}
									placeholder="Chọn loại công trình"
									optionFilterProp="children"
									onSelect={(val: string, item: any) => this._selectLoaiCP(val, item)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
								<Button type="primary" htmlType="submit" onClick={this._onFinish}>
									Lưu
								</Button>
							</Form.Item>
						</Form>
					</TabPane>
					<TabPane tab="Thư viện" key="2">
						
					</TabPane>
					<TabPane tab="Tra định mức" key="3">
						
					</TabPane>
				</Tabs>
			</section>
		);
	}
};
export default MauBangTra