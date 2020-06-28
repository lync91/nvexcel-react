import React, { Component } from "react";
import { Select, Form, Button, Checkbox } from 'antd';
import { ws } from "../api/nvExcel";
// import { getPageType, getOrientationType } from "../api/mapIndex"

export interface AppProps {
}
export interface AppStates {
	pageSize: string;
	orientation: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean | undefined;
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class PageFormat extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			pageSize: 'a4',
			orientation: 'portrait',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false
		}
	}
	_formatPage = async () => {
		await ws?.getActive();
		ws?.setPrintAreabySelected();
		ws?.setPaperType(this.state.pageSize);
		ws?.setOrientation(this.state.orientation);
		ws?.setPageZoom(1)
		this.state.autoInit ? ws!.autoSetPrintArea() : ws!.setPrintAreabySelected()
		this.state.orientation === "portrait" ? ws!.setPageMargin(40, 40, 50, 40) : ws!.setPageMargin(50, 40, 40, 40)
		if (this.state.isSetFont) ws?.setFont('Times New Roman');
		if (this.state.blackAndWhite) ws?.setBlackAndWhite();
	}
	_changePageSize = (value: string) => {
		this.setState({ pageSize: value })
	}
	_changOrientation = (value: string) => {
		this.setState({ orientation: value })
	}
	handleChange = (value: string) => {
		this.setState({ pageSize: value })
	}
	onFinish = (values: any) => {
		console.log(values);
	  };
	render() {
		const { Option } = Select;
		return (
			<section>
				<Form
					layout="horizontal"
					onFinish={this.onFinish}
				>
					<Form.Item label="Cỡ giấy">
						<Select defaultValue={this.state.pageSize} onChange={this._changePageSize}>
							<Option value="a4">A4</Option>
							<Option value="a3">A3</Option>
						</Select>
					</Form.Item>
					<Form.Item label="Kiểu in">
						<Select defaultValue={this.state.orientation} onChange={this._changOrientation}>
							<Option value="portrait">Dọc</Option>
							<Option value="landscape">Ngang</Option>
						</Select>
					</Form.Item>
					<Form.Item label="Các tùy chọn khác">
						<Checkbox checked={this.state.autoInit} onChange={() => this.setState({autoInit: !this.state.autoInit})}>Tự động nhận dạng vùng in</Checkbox>
						</Form.Item>
						<Form.Item>
						<Checkbox checked={this.state.blackAndWhite} onChange={() => this.setState({blackAndWhite: !this.state.blackAndWhite})}>In đen trắng</Checkbox>
						</Form.Item>
						<Form.Item>
						<Checkbox checked={this.state.isSetFont} onChange={() => this.setState({isSetFont: !this.state.isSetFont})}>Đặt font chữ là Times New Roman</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" onClick={this._formatPage}>Định dạng</Button>
					</Form.Item>
				</Form>
			</section>
		);
	}
};
export default PageFormat