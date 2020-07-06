import { AsyncConstructor } from 'async-constructor';
import { EventEmitter } from "events";
import { getPageType, getOrientationType } from "./mapIndex";
import { ws, ee } from './nvExcel';
import { HAO_PHI_VAT_TU_NAME, TIEN_LUONG_SHEET_NAME } from '../constants/named';
import { sheetMap } from "../constants/map";
import { sheetChanged } from "./wsEvents"
import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";

export interface addressTypes {
	text: string | null;
	col: string | null;
	row: number | null
}

export class addressObj {
	sheet!: string;
	text!: string;
	cell1: addressTypes = {
		text: null,
		col: null,
		row: null
	};
	cell2: addressTypes = {
		text: null,
		col: null,
		row: null
	}
	constructor(txt: string | undefined) {
		if (txt) {
			this.text = txt.replace(/(([^!]+)?)!/g, '');
			const t = this.text.split(":")
			this.cell1.text = t[0];
			this.cell1.col = t[0].replace(/([0-9])+/g, "");
			this.cell1.row = parseInt(t[0].replace(/([A-Z]|[a-z])+/g, ""));
			if (t[1]) {
				this.cell2.text = t[1];
				this.cell2.col = t[1].replace(/([0-9])+/g, "");
				this.cell2.row = parseInt(t[1].replace(/([A-Z]|[a-z])+/g, ""));
			}
		}
	}
}


export interface getLastColTypes {
	wsName?: string | null;
	name?: string | null;
}
export class wsObject extends AsyncConstructor {
	ws!: Excel.Worksheet;
	private context!: Excel.RequestContext;
	name: string | null = null;
	lastCol!: addressTypes;
	lastRow!: addressTypes;
	selectedRange!: string;
	sheetMap: any;
	projectInfo: any = {};
	constructor(wsName: string | null = null) {
		super(async () => {
			this.name = wsName;
			this.sheetMap = new sheetMap();
			try {
				await Excel.run(async (context: Excel.RequestContext) => {
					this.context = context
				})
			} catch (error) {
				console.log(error);
			}
			this.getProjectInfo();
			this.getActive();
		})
	}
	initContext() {
		const promise = new Promise(async (res, rej) => {
			try {
				await Excel.run(async (context: Excel.RequestContext) => {
					res(context);
				})
			} catch (error) {
				console.log(error);
			}
		})
		return promise
	}
	async regEvents() {
		let sheets = this.context?.workbook.worksheets;
		sheets?.onActivated.add(this.onActivate);
		sheets?.onSelectionChanged.add(this.onSelectionChanged)
		sheets?.onChanged.add(this.onSheetChanged);
		console.log("A handler has been registered for the OnActivate event.");
	}
	async onActivate(event: any) {
		const name = await ws?.getActivedSheetName();
		this.name = name;
		ws?.sheetMap.navigate(name)
	}
	async onSelectionChanged(event: any) {
		console.log(event);
		const address = new addressObj(event.address)
		if ((address.cell1.col === 'D' || address.cell1.col === 'C') && address.cell1.row! > 6) {
			ee.emit(`${WORKSHEET_SELECTION_CHANGED}_${event.worksheetId}`, event.address);
		}
		
	}
	async onSheetChanged(event: any) {
		sheetChanged(event)
	}
	async currentWs(name: string) {
		this.name = name;
		this.ws = this.context!.workbook.worksheets.getItemOrNullObject(name!)
		this.ws.load('id');
		await this.context.sync()
		return this.ws.id;
	}
	async getActive() {
		this.ws = this.context!.workbook.worksheets.getActiveWorksheet();
		const name = await ws?.getActivedSheetName();
		this.name = name;
	}

	async checkWsExits(name: string) {
		const ws = this.context!.workbook.worksheets.getItemOrNullObject(name);
		ws.load('name')
		await this.context!.sync();
		return name === ws.name ? true : false
	}

	async getActivedSheetName() {
		const ws = this.context!.workbook.worksheets.getActiveWorksheet()
		ws.load('name')
		await this.context?.sync();
		return ws.name
	}

	async create() {
		try {
			await Excel.run(async context => {
				this.ws = context.workbook.worksheets.add(this.name!);
				this.ws.activate();
			})
		} catch (error) {
			console.log(error);

		}
	}
	async activate() {
		this.ws?.activate();
		await this.context.sync()
	}
	async getValues(address: string) {
		const rg = this.ws?.getRange(address);
		rg?.load('values');
		await this.context?.sync();
		return rg?.values;
	}
	async getFomulas(address: string) {
		const rg = this.ws?.getRange(address);
		rg?.load('formulasR1C1');
		await this.context?.sync();
		return rg?.formulasR1C1;
	}
	async addValues(address: string, values: any[][]) {
		const rg = this.ws?.getRange(address);
		rg!.values = values;
		await this.context.sync()
	}
	setPrintAreabySelected() {
		this.ws?.pageLayout.setPrintArea(this.selectedRange)
	}
	autoSetPrintArea() {
		this.ws?.pageLayout.setPrintArea("A:" + this.lastCol.col)
	}
	setPrintArea(address: string) {
		this.ws?.pageLayout.setPrintArea(address)
	}
	async setFont(fontName: string, address: string | undefined = undefined) {
		const addr = address ? address : 'A:Z';
		this.ws!.getRange(addr).format.font.name = fontName;
	}
	setBlackAndWhite() {
		this.ws!.pageLayout.blackAndWhite = true;
	}
	setPageMargin(top: number, bottom: number, left: number, right: number) {
		this.ws!.pageLayout.topMargin = top;
		this.ws!.pageLayout.bottomMargin = bottom;
		this.ws!.pageLayout.leftMargin = left;
		this.ws!.pageLayout.rightMargin = right;
	}
	setPaperType(paperType: string) {
		this.ws!.pageLayout.paperSize = getPageType(paperType)
	}
	setOrientation(ori: string) {
		this.ws!.pageLayout.orientation = getOrientationType(ori)
	}
	setCenter(hor: boolean = false, ver: boolean = false) {
		this.ws!.pageLayout.centerHorizontally = hor;
		this.ws!.pageLayout.centerVertically = ver;
	}
	setPageZoom(hoz: number = 0, ver: number = 0) {
		if (hoz !== 0) this.ws!.pageLayout.zoom = { horizontalFitToPages: 1 };
		if (ver !== 0) this.ws!.pageLayout.zoom = { verticalFitToPages: 1 };
	}
	colWidth(col: string, w: number) {
		this.ws!.getRange(`${col}1`).format.columnWidth = w;
	}
	autoColWidth(col: string) {
		this.ws!.getRange(`${col}:${col}`).format.autofitColumns();
	}
	autoRowsHeight(address: string) {
		this.ws!.getRange(address).format.autofitRows();
	}
	rowsHeight(address: string, h: number) {
		this.ws!.getRange(address).format.rowHeight = h;
	}
	mergeCells(address: string) {
		this.ws?.getRange(address).merge();
	}
	verCenter(address: string) {
		this.ws!.getRange(address)!.format.verticalAlignment = 'Center'
	}
	horCenter(address: string) {
		this.ws!.getRange(address)!.format.horizontalAlignment = 'Center'
	}
	setBold(address: string) {
		this.ws!.getRange(address)!.format.font.bold = true
	}
	setWrapText(address: string) {
		this.ws!.getRange(address)!.format.wrapText = true
	}
	unmergeCells(address: string) {
		this.ws!.getRange(address).unmerge();
	}
	async moveRange(from: string, to: string) {
		const rg = this.ws!.getRange(from);
		rg.load('values');
		await this.context?.sync();
		this.ws!.getRange(to).values = rg.values;

	}
	async sheetSlice(values: any, tbName: string) {
		let valuesMap: any[] = [];
		await values.forEach((e: any[], i: number) => {
			if (e[0] === HAO_PHI_VAT_TU_NAME) {
				valuesMap.push(i)
			}
		});
		valuesMap.forEach(async (e, i) => {
			const sheets = this.context!.workbook.worksheets;
			sheets.add();
		})

	}
	async addSheet(name: string) {
		this.context?.workbook.worksheets.add(name);
	}
	async getSelectedValues() {
		const rg = this.context?.workbook.getSelectedRange();
		rg?.load('values');
		await this.context?.sync();
		return rg?.values;
	}
	async getSelectedAddress() {
		const rg = this.context?.workbook.getSelectedRange();
		rg?.load('address');
		await this.context?.sync();
		return new addressObj(rg?.address);
	}
	async save() { }
	async setCustomConditionalFormat(address: string, formula: string, color: string | null, bold: boolean, italic: boolean, border: boolean) {
		const rg = this.ws?.getRange(address);
		const conditionalFormat = rg?.conditionalFormats.add(Excel.ConditionalFormatType.custom);
		conditionalFormat!.custom.rule.formula = formula;
		if (color) conditionalFormat!.custom.format.font.color = color;
		conditionalFormat!.custom.format.font.bold = bold;
		conditionalFormat!.custom.format.font.italic = italic;
		if (border) {
			conditionalFormat!.custom.format.borders.getItem('EdgeBottom').style = 'Continuous';
			conditionalFormat!.custom.format.borders.getItem('EdgeLeft').style = 'Continuous';
			conditionalFormat!.custom.format.borders.getItem('EdgeRight').style = 'Continuous';
			conditionalFormat!.custom.format.borders.getItem('EdgeTop').style = 'Continuous';
		}

	}
	async createTable(address: string, name: string, values: string[][] | null) {
		const expensesTable = this.ws!.tables.add(address, true /*hasHeaders*/);
		expensesTable.name = name;
		if (values) expensesTable.rows.add(undefined, values)
	}
	async delete(name: string) {
		this.context?.workbook.worksheets.getItemOrNullObject(name).delete();
		await this.context?.sync();
	}
	async getLastRow() {
		const rangeA = this.ws?.getRange('A:ZZ');
		const lastRow = rangeA?.find("*", {
			completeMatch: true, // find will match the whole cell value
			matchCase: false, // find will not match case
			searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
		})
		lastRow?.load('address');
		await this.context?.sync();
		return new addressObj(lastRow?.address);
	}
	async getLastCol() {
		const rangeA = this.ws?.getRange('A1:ZZ4');
		const lastCol = rangeA?.find("*", {
			completeMatch: true, // find will match the whole cell value
			matchCase: false, // find will not match case
			searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
		})
		lastCol?.load('address');
		await this.context?.sync();
		return new addressObj(lastCol?.address);
	}
	async clearValues(address: string) {
		try {
			this.ws?.getRange(address).clear('Contents');
		} catch (error) {
			console.log(error);

		}
	}
	async insertRange(address: string) {
		const rg = this.ws?.getRange(address)
		rg.insert(Excel.InsertShiftDirection.down);
		await this.context.sync();
	}
	async setPropeties() {
		var docProperties = this.context.workbook.properties.custom;
		docProperties.add(TIEN_LUONG_SHEET_NAME, 'hello');
		return this.context.sync();
		
	}
	async getPropeties() {
		var docProperties = this.context.workbook.properties.custom;
		const customProperty = docProperties.getItemOrNullObject(TIEN_LUONG_SHEET_NAME)
		customProperty.load("key, value")
		await this.context.sync();
	}
	async updateProjectInfo(key: string, value: any) {
		this.projectInfo[key] = value;
		var docProperties = this.context.workbook.properties.custom;
		docProperties.add('ProjectInfo', JSON.stringify(this.projectInfo));
		return this.context.sync();
	}
	async getProjectInfo() {
		var docProperties = this.context.workbook.properties.custom;
		const customProperty = docProperties.getItemOrNullObject('ProjectInfo')
		customProperty.load("key, value")
		await this.context.sync();
		if (customProperty.value) {
			this.projectInfo = JSON.parse(customProperty.value)
			console.log(this.projectInfo);
			
		}
	}
}