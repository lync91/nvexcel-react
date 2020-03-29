import React, { Component } from "react";
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ws } from "../api/nvExcel";
import { NvDefButton } from "./nvButton";
import { BANG_CONG_TRINH } from "../constants/named";

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
		console.log(ws);
		await ws?.currentWs(BANG_CONG_TRINH)
		
	}
	async _formatCongTrinh() {
		await ws?.currentWs(BANG_CONG_TRINH)
		ws?.getValues('A1:A2');
		ws?.setPrintArea('A:W');
		ws?.setFont('Times New Roman');
		ws?.setBlackAndWhite();
		ws?.setPaperType('a4');
		ws?.setOrientation('landscape');
		ws?.setPageZoom(1);
		ws?.setPageMargin(50, 40, 40, 40);
		ws?.setCenter(true);
	}
	render() {
		return (
			<section className="ms-Grid">
				<Separator>Định dạng trạng in G8</Separator>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg12 mt-8">
						<Stack className="btn-container" horizontal>
							<NvDefButton text="Bảng dự toán hạng mục công trình" onClick={this._formatPage} isLoading={false} />
							<NvDefButton text="Bảng công trình" onClick={this._formatCongTrinh} isLoading={false} />
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