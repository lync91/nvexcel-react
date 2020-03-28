import React, { Component } from "react";
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { getLastRow, getLastCol } from "../api/Eutils";
import { getPageType, getOrientationType } from "../api/mapIndex";
import { NvDefButton } from "./nvButton";

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
	// _changePageSize = (option: IDropdownOption, _index?: number) => {
	// 	this.setState({ pageSize: option.key.toString() });
	// }
	// _changOrientation = (option: IDropdownOption, _index?: number) => {
	// 	this.setState({ orientation: option.key.toString() });
	// }
	render() {
		return (
			<section className="ms-Grid">
				<Separator>Định dạng trạng in G8</Separator>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg12 mt-8">
						<Stack className="btn-container" horizontal>
							<NvDefButton text={"Hello"} onClick={this._formatPage} isLoading={true} />
							<NvDefButton text="Bảng dự toán hạng mục công trình" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng công trình" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng tổng hợp vật tư" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng hao phí vật tư" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng giá tháng" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng chiết tính" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng dự thầu" onClick={this._formatPage} isLoading={false} />
							<Toggle className="mt-8" 
								defaultChecked={this.state.isSetFont} 
								onText="Ẩn cột vật tư trong bảng công trình" 
								offText="Ẩn cột vật tư trong bảng công trình" 
								onChange={(_e, checked) => this.setState({isSetFont: checked || false})} />
						</Stack>
					</div>
				</div>
			</section>
		);
	}
};
export default PageFormatG8