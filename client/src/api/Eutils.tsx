import { AsyncConstructor } from 'async-constructor';
import { getPageType, getOrientationType } from "./mapIndex";
import { ws } from './nvExcel';
import { HAO_PHI_VAT_TU_NAME } from '../constants/named';
export function getLastRow(ws: any): Excel.Range {
	const rangeA = ws.getRange('A:ZZ');
	const lastRow = rangeA.find("*", {
		completeMatch: true, // find will match the whole cell value
		matchCase: false, // find will not match case
		searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
	})
	return lastRow
}
export function getLastCol(ws: any): Excel.Range {
	const rangeA = ws.getRange('A1:ZZ4');
	const lastCol = rangeA.find("*", {
		completeMatch: true, // find will match the whole cell value
		matchCase: false, // find will not match case
		searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
	})
	return lastCol
}

export interface addressTypes {
	text: string;
	col: string;
	row: string
}

export class addressObj {
	sheet!: string;
	text!: string;
	cell1: addressTypes = {
		text: "",
		col: "",
		row: ""
	};
	cell2: addressTypes = {
		text: "",
		col: "",
		row: ""
	}
	constructor(txt: string) {
		this.text = txt.replace(/(([^!]+)?)!/g, '');
		const t = this.text.split(":")
		this.cell1.text = t[0];
		this.cell1.col = t[0].replace(/([0-9])+/g, "");
		this.cell1.row = t[0].replace(/([A-Z]|[a-z])+/g, "");
		if (t[1]) {
			this.cell2.text = t[1];
			this.cell2.col = t[1].replace(/([0-9])+/g, "");
			this.cell2.row = t[1].replace(/([A-Z]|[a-z])+/g, "");
		}
	}
}

export function getWsInfo(wsName: string | null = null) {
	const promise = new Promise((resolve, rejects) => {
		try {
			Excel.run(async context => {
				let ws: Excel.Worksheet = context.workbook.worksheets.getActiveWorksheet()
				wsName ? ws = context.workbook.worksheets.getItem(wsName)
					: ws = context.workbook.worksheets.getActiveWorksheet();
				ws.load('name');
				const lastCol = getLastCol(ws);
				lastCol.load('address');
				await context.sync();
				resolve({
					name: ws.name
				})
			})
		} catch (error) {
			rejects(error)
		}
	})
	return promise
}

export interface getLastColTypes {
	wsName?: string | null;
	name?: string | null;
}
export class wsObject extends AsyncConstructor {
	ws: Excel.Worksheet | null = null;
	private context: Excel.RequestContext | null = null;
	wsName: string | null = null;
	name!: string;
	lastCol!: addressTypes;
	lastRow!: addressTypes;
	selectedRange!: string;
	constructor(wsName: string | null = null) {
		super(async () => {
			this.wsName = wsName;
			await this.initContext()
				.then(async x => {
					if (wsName) {
						await this.isWsExits()
							.then(name => !name ? this.create().then(x => this.initWsInfo()) :
								this.getWorksheet().then(x => this.initWsInfo().then(x => this.getWorksheet())));
					} else {
						await this.getActive().then(x => this.initWsInfo());
					}
				})

		})
	}
	async initContext() {
		try {
			await Excel.run(async context => {
				this.context = context
			})
		} catch (error) {
		}
	}
	async initWsInfo() {
		const rg = this.context!.workbook.getSelectedRange();
		rg.load('address')
		this.ws!.load('name');
		const lastRow: Excel.Range = getLastRow(this.ws);
		const lastCol: Excel.Range = getLastCol(this.ws);
		lastRow.load('address');
		lastCol.load('address');
		await this.context!.sync();
		const lastcolAd = new addressObj(lastCol.address);
		const lastrowAd = new addressObj(lastRow.address);
		console.log(this.ws!.name);
		
		this.lastCol = lastcolAd.cell1;
		this.lastRow = lastrowAd.cell1;
		this.name = this.ws!.name;
		this.selectedRange = rg.address;
	}
	async currentWs(name: string) {
		this.wsName = name;
		this.name = name;
		this.getWorksheet(name).then(x => this.initWsInfo())
	}
	async getWorksheet(newWS: string | null = null) {
		const promise = new Promise(async (resolve, rejects) => {
			const name = newWS ? newWS : this.wsName;
			this.ws = this.context!.workbook.worksheets.getItemOrNullObject(name!);
			resolve()
		})
		return promise
	}
	async getActive() {
		this.ws = this.context!.workbook.worksheets.getActiveWorksheet()
	}
	async isWsExits() {
		const promise = new Promise(async (resolve, rejects) => {
			const ws = this.context!.workbook.worksheets.getItemOrNullObject(this.wsName!);
			ws.load('name')
			await this.context!.sync();
			resolve(ws.name)
			this.name = ws.name;
		})
		return promise
	}

	async checkWsExits(name: string) {
		const promise = new Promise(async (resolve, rejects) => {
			const ws = this.context!.workbook.worksheets.getItemOrNullObject(name);
			ws.load('name')
			await this.context!.sync();
			resolve(ws.name)
			this.name = ws.name;
		})
		return promise
	}

	async create() {
		try {
			await Excel.run(async context => {
				this.ws = context.workbook.worksheets.add(this.wsName!);
				this.ws.activate();
			})
		} catch (error) {
			console.log(error);

		}
	}
	activate() {
		this.ws?.activate();
	}
	setSheetValues() {
		const rg = this.ws?.getRange(`A1:${this.lastCol.text}`);
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
	setFont(fontName: string, address: string | undefined = undefined) {
		const addr = address ? address : 'A:Z'
		this.ws!.getRange('A:Z').format.font.name = fontName;
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
			console.log(sheets);
			const sheet = sheets.add();
		})

	}
	async addSheet(name: string) {
		try {
			await Excel.run(async context => {
				const sheets = context.workbook.worksheets;
				const sheet = sheets.add(name);
				sheet.load('name');
			})
		} catch (error) {
		}

	}
	async getSelectedValues() {
		const rg = this.context?.workbook.getSelectedRange();
		rg?.load('values');
		await this.context?.sync();
		return rg?.values;
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
}