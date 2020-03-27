import React, { Component } from "react";
import { Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { getLastRow, getLastCol } from "../api/Eutils";
import { getPageType, getOrientationType } from "../api/mapIndex"

export interface AppProps {
}
export interface AppStates {
	pageSize: string;
	orientation: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean;
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
export class PageFormatG8 extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			pageSize: 'a3',
			orientation: 'portrait',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false
		}
	}
	componentWillMount() {
	}
	_formatPage = async () => {
		try {
			await Excel.run(async context => {
				const ws = context.workbook.worksheets.getActiveWorksheet();
				ws.pageLayout.paperSize = getPageType(this.state.pageSize);
				ws.pageLayout.orientation = getOrientationType(this.state.orientation);
				const range = context.workbook.getSelectedRange();
				range.load('address')
				const lastRow: Excel.Range = getLastRow(ws);
				const lastCol: Excel.Range = getLastCol(ws);
				lastRow.load("address");
				lastCol.load("address");
				await context.sync();
				console.log('lastRow', lastRow.address);
				console.log('lastCol', lastCol.address);

				if (this.state.autoInit) {
					if (lastCol.address) {
						const printArea = 'A:' + lastCol.address.slice(range.address.indexOf('!') + 1, lastCol.address.length);
						ws.pageLayout.setPrintArea(printArea);
					}
				} else {
					const printArea = range.address.slice(range.address.indexOf('!') + 1, range.address.length);
					ws.pageLayout.setPrintArea(printArea);
				}
				if (this.state.orientation === "portrait") {
					ws.pageLayout.topMargin = 40;
					ws.pageLayout.bottomMargin = 40;
					ws.pageLayout.leftMargin = 50;
					ws.pageLayout.rightMargin = 20;
				}
				if (this.state.orientation === "landscape") {
					ws.pageLayout.topMargin = 50;
					ws.pageLayout.bottomMargin = 40;
					ws.pageLayout.leftMargin = 40;
					ws.pageLayout.rightMargin = 40;
				}
				ws.pageLayout.zoom = { horizontalFitToPages: 1 };
				ws.pageLayout.centerHorizontally = true;
				ws.pageLayout.centerVertically = false;
				ws.pageLayout.blackAndWhite = this.state.blackAndWhite;
				if (this.state.isSetFont) {
					range.format.font.name = 'Times New Roman';
				}
			});
		} catch (error) {
			console.error(error);
		}

	}
	_changePageSize = (option: IDropdownOption, _index?: number) => {
		this.setState({ pageSize: option.key.toString() });
	}
	_changOrientation = (option: IDropdownOption, _index?: number) => {
		this.setState({ orientation: option.key.toString() });
	}
	_isAutoInitChanged = (checked: boolean) => {
		this.setState({ autoInit: checked });
	}
	_isBlackAndWhite = (checked: boolean) => {
		this.setState({ autoInit: checked });
	}
	_isSetFontChanged = (checked: boolean) => {
		this.setState({ isSetFont: checked });
	}
	render() {
		return (
			<section className="ms-Grid">
				<Separator>Định dạng trạng in tự động</Separator>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg12">
						<Dropdown placeholder="Chọn cỡ giấy" label="Cỡ giấy" defaultSelectedKey={this.state.pageSize} options={options} styles={dropdownStyles} onChanged={this._changePageSize} />
						<Dropdown placeholder="Chọn kiểu in" label="Kiểu in" defaultSelectedKey={this.state.orientation} options={optKieuin} styles={dropdownStyles} onChanged={this._changOrientation} />
						<Toggle className="mt-8" defaultChecked={this.state.autoInit} onText="Tự động nhận dạng vùng in" offText="Tự động nhận dạng vùng in" onChanged={this._isAutoInitChanged} />
						<Toggle className="mt-8" defaultChecked={this.state.blackAndWhite} onText="In đen trắng" offText="In đen trắng" onChanged={this._isBlackAndWhite} />
						<Toggle className="mt-8" defaultChecked={this.state.isSetFont} onText="Đặt font Times New Romans" offText="Đặt font Times New Romans" onChanged={this._isSetFontChanged} />
					</div>
				</div>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 mt-8">
						<Stack horizontal>
							<PrimaryButton text="Định dạng" onClick={this._formatPage} allowDisabledFocus />
						</Stack>
					</div>
				</div>
				<Separator>Định dạng trạng in G8</Separator>
				<div className="ms-Grid-row">
					<div>
						<Toggle label="Tự động nhận dạng vùng in" defaultChecked={this.state.autoInit} onText="Bật" offText="Tắt" />
					</div>
					<div>
						<Stack>
						</Stack>
					</div>
				</div>
			</section>
		);
	}
};
export default PageFormatG8