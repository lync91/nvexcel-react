import React, { Component } from "react";
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ws } from "../api/nvExcel";
import { NvDefButton } from "./nvButton";
import { 
	BANG_CONG_TRINH,
	BANG_TONG_HOP_VAT_TU,
	BANG_HAO_PHI_VAT_TU,
	HAO_PHI_VAT_TU_NAME
} from "../constants/named";

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
export class OtherTools extends Component<AppProps, AppStates> {
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
	async _formatPage() {
		await ws?.addSheet('Test')
		await ws?.currentWs('QLBH');
		const vals = await ws?.getValues(`A4:G28`);
		const fomuls = await ws?.getFomulas(`A4:G28`);
		console.log(fomuls);
		await ws?.currentWs('Test')
		ws?.addValues(`A1:G${fomuls?.length}`, fomuls!)
	}
	render() {
		return (
			<section className="ms-Grid">
				<Separator>Định dạng trạng in G8</Separator>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg12 mt-8">
						<Stack className="btn-container" horizontal>
							<NvDefButton text="Tạo bảng chiết tính" onClick={this._formatPage} isLoading={false} />
						</Stack>
					</div>
				</div>
			</section>
		);
	}
};
export default OtherTools