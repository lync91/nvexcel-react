import { 
	CONG_TRINH_CONG_NGHIEP_NAME,
	CONG_TRINH_DAN_DUNG_NAME,
	CONG_TRINH_GIAO_THONG_NAME,
	CONG_TRINH_HA_TANG_NAME,
	CONG_TRINH_NONG_NGHIEP_NAME,
	CAP_DAC_BIET_NAME,
	CAP_I_NAME,
	CAP_II_NAME,
	CAP_III_NAME,
	CAP_IV_NAME
 } from "./named";

export const BANGTRA1 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '30000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
		font: 'Times New Roman',
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
		font: 'Times New Roman',
	}
]
export const BANGTRA2 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '1', '3', '7', '15'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA3 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '10', '20', '50', '100', '200', '500', '800', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_DAC_BIET_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_I_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_II_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_III_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_IV_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_DAC_BIET_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_I_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_II_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_III_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_IV_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_DAC_BIET_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_I_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_II_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_III_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_IV_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_DAC_BIET_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_I_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_II_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_III_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_IV_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_DAC_BIET_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_I_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_II_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_III_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_IV_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA4 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '10', '20', '50', '100', '200', '500', '800', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA5 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '100', '200', '500', '1000', '2000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA6 = [
	{
		range: [
			{
				values: ['STT', 'Chi phí tư vấn (chưa có thuế GTGT) trong dự toán gói thầu tư vấn (tỷ đồng)','Cấp công trình', '10', '20', '50', '100', '200', '500', '1000', '2000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', 'Tỷ lệ %', '', '', '', '', '', '', '', '', ''],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA7 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '10', '20', '50', '100', '200', '500', '800', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA8 = [
	{
		range: [
			{
				values: ['STT', 'Giá trị tổng mức đầu tư (chưa có thuế GTGT) được duyệt (tỷ đồng)','Cấp công trình', '100', '300', '500', '1000', '2000', '5000', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', 'Tỷ lệ %', '', '', '', '', '', '', '', ''],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA9 = [
	{
		range: [
			{
				values: ['STT', 'Chi phí khảo sát xây dựng (chưa có thuế GTGT) trong dự toán gói thầu khảo sát xây dựng (tỷ đồng)','Cấp công trình', '1', '5', '10', '20', '50'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', 'Tỷ lệ %', '', '', '', '', '', ''],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const listCP = [
	{
		stt: 1,
		nhomcp: 'QLDA',
		tencp: 'Chi phí quản lý dự án',
		key: 'qlda',
		template: BANGTRA1
	},
	{
		stt: 2,
		nhomcp: 'TV',
		tencp: 'Tư vấn khảo sát',
		key: 'ks'
    },
    {
		stt: 3,
		nhomcp: 'TV',
		tencp: 'Tư vấn giám sát công tác khảo sát xây dựng',
		key: 'gsks',
		template: BANGTRA9
	},
	{
		stt: 4,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập báo cáo kinh tế - kỹ thuật',
		key: 'bcktkt',
		template: BANGTRA2
	},
	{
		stt: 5,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập báo cáo nghiên cứu tiền khả thi',
		key: 'bcnctkt',
		template: BANGTRA1
	},
	{
		stt: 6,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập báo cáo nghiên cứu khả thi',
		key: 'bcnckt',
		template: BANGTRA1
	},
	{
		stt: 7,
		nhomcp: 'TV',
		tencp: 'Tư vấn thiết kế kỹ thuật',
		key: 'tkkt',
		template: BANGTRA3
	},
	{
		stt: 8,
		nhomcp: 'TV',
		tencp: 'Tư vấn thiết kế bản vẽ thi công',
		key: 'tkbvtc',
		template: BANGTRA3
	},
	{
		stt: 9,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra báo cáo nghiên cứu tiền khả thi',
		key: 'ttbcnctkt',
		template: BANGTRA1
	},
	{
		stt: 10,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra báo cáo nghiên cứu khả thi',
		key: 'ttbcnckt',
		template: BANGTRA1
	},
	{
		stt: 11,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra thiết kế',
		key: 'tttk',
		template: BANGTRA4
	},
	{
		stt: 12,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra dự toán xây dựng',
		key: 'ttdt',
		template: BANGTRA4
	},
	{
		stt: 13,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu tư vấn',
		key: 'lhsmttv',
		template: BANGTRA6
	},
	{
		stt: 14,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu thi công xây dựng',
		key: 'lhsmttc',
		template: BANGTRA5
	},
	{
		stt: 15,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu mua sắm vật tư, thiết bị',
		key: 'lhsmttb',
		template: BANGTRA5
	},
	{
		stt: 16,
		nhomcp: 'TV',
		tencp: 'Tư vấn giám sát thi công xây dựng',
		key: 'gstc',
		template: BANGTRA7
	},
	{
		stt: 17,
		nhomcp: 'TV',
		tencp: 'Tư vấn giám sát lắp đặt thiết bị',
		key: 'gstb',
		template: BANGTRA7
	},
    {
		stt: 18,
		nhomcp: 'TV',
		tencp: 'Tư vấn quy đổi vốn đầu tư xây dựng',
		key: 'qdvdt',
		template: BANGTRA8
	},
	
]
