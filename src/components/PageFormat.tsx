import React, { Component } from "react";
import { Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { wsObject } from "../api/Eutils";
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


const dropdownStyles: Partial<IDropdownStyles> = {
	dropdown: { width: 300 }
};

const options: IDropdownOption[] = [
	{ key: "a4", text: "A4" },
	{ key: "a3", text: "A3" },
];
const optKieuin: IDropdownOption[] = [
	{ key: "portrait", text: "Dọc" },
	{ key: "landscape", text: "Ngang" },
];
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
		const ws = await new wsObject();
		ws.getValues('A1:A2');
		ws.setPrintAreabySelected();
		ws.setPaperType(this.state.pageSize);
		ws.setOrientation(this.state.orientation);
		ws.setPageZoom(1)
		this.state.autoInit? ws.autoSetPrintArea() : ws.setPrintAreabySelected()
		this.state.orientation === "portrait" ? ws.setPageMargin(40, 40, 50, 40) : ws.setPageMargin(50, 40, 40, 40)
		if (this.state.isSetFont) ws.setFont('Times New Roman');
		if (this.state.blackAndWhite) ws.setBlackAndWhite();
	}
	_changePageSize = (option: IDropdownOption, _index?: number) => {
		this.setState({ pageSize: option.key.toString() });
	}
	_changOrientation = (option: IDropdownOption, _index?: number) => {
		this.setState({ orientation: option.key.toString() });
	}
	render() {
		return (
			<section className="ms-Grid">
				<Separator>Định dạng trạng in tự động</Separator>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg12">
						<Dropdown placeholder="Chọn cỡ giấy" label="Cỡ giấy" defaultSelectedKey={this.state.pageSize} options={options} styles={dropdownStyles} onChanged={this._changePageSize} />
						<Dropdown placeholder="Chọn kiểu in" label="Kiểu in" defaultSelectedKey={this.state.orientation} options={optKieuin} styles={dropdownStyles} onChanged={this._changOrientation} />
						<Toggle 
							className="mt-8" 
							defaultChecked={this.state.autoInit} 
							onText="Tự động nhận dạng vùng in" 
							offText="Tự động nhận dạng vùng in" 
							onChange={(_e, checked) => this.setState({autoInit: checked || false})} />
						<Toggle 
							className="mt-8" 
							defaultChecked={this.state.blackAndWhite} 
							onText="In đen trắng" 
							offText="In đen trắng" 
							onChange={(_e, checked) => this.setState({blackAndWhite: checked || true})} />
						<Toggle 
							className="mt-8" 
							defaultChecked={this.state.isSetFont} 
							onText="Đặt font Times New Romans" 
							offText="Đặt font Times New Romans" 
							onChange={(_e, checked) => this.setState({isSetFont: checked})} />
					</div>
				</div>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 mt-8">
						<Stack horizontal>
							<PrimaryButton text="Định dạng" onClick={this._formatPage} allowDisabledFocus />
						</Stack>
					</div>
				</div>
			</section>
		);
	}
};
export default PageFormat