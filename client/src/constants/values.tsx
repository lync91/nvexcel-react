import { PROJECT_INFO, LOAI_CONG_TRINH_RANGE } from "./named";

export const MAU_KHOI_LUONG = [['BẢNG MẪU KHỐI LƯỢNG CÔNG TRÌNH'], ['Công trình: '], ['Địa điểm: ']]
export const TIEN_LUONG_TITLE = [['BẢNG TIÊN LƯỢNG CÔNG TRÌNH'], ['Công trình: '], ['Địa điểm: ']]

export const TONG_HOP_KHOI_LUONG_HEADER = [['Ký hiệu', 'STT', 'Mã đơn giá', 'Tên công việc', 'Đơn vị', 'Hệ số', 'Số lượng', 'Diễn giải', 'Khối lượng 1 cấu kiện', 'Khối lượng'
]]
export const AUTO_STT_FOMULA = '=IF(INDIRECT(CONCAT("A",ROW()))="+",COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"+"),IF(INDIRECT(CONCAT("A",ROW()))="#",ROMAN(COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"#")),IF(INDIRECT(CONCAT("A",ROW()))="HM","HM","")))'
export const KHOI_LUONG_DEFAULT_VALUES = [['HM', `${AUTO_STT_FOMULA}`,
    '', '', '', '', '', '', '', ''
]]

export const DAU_VAO_OBJECT = {
    name: 'Đầu vào',
    colwidth: [30, 80, 80, 80, 80, 80],
    font: 'Times New Roman',
    printArea: 'A:F',
    pageSize: 'A4',
    contents: [
        {
            range: [
                {
                    values: ['THÔNG TIN CÔNG TRÌNH VÀ DỮ LIỆU ĐẦU VÀO', ''],
                    bold: true,
                    height: 24,
                    hCenter: true,
                    vCenter: true,
                    colSpan: [6]
                },
                {
                    values: ['', ''],
                    bold: true
                },
                {
                    values: ['I.', 'THÔNG TIN CHUNG'],
                    bold: true
                },

            ]

        },
        {
            range: [{
                values: ['STT', 'Thông tin', 'Nội dung'],
                bold: true,
                colSpan: [1, 1, 4],
                fillColor: '#C6E0B4',
                hCenter: true,
                vCenter: true
            }],
            border: true
        },
        {
            range: [
                { values: ['1', 'Tên công trình'], colSpan: [1, 1, 4], names: [[2, 'TEN_CONG_TRINH']] },
                { values: ['2', 'Địa điểm'], colSpan: [1, 1, 4], names: [[2, 'DIA_DIEM']] },
                { values: ['3', 'Chủ đầu tư'], colSpan: [1, 1, 4], names: [[2, 'CHU_DAU_TU']] },
                {
                    values: ['4', 'Nhóm dự án'], colSpan: [1, 1, 4], names: [[2, 'NHOM_DU_AN']], Validation: {
                        cell: 2,
                        list: 'AC3:AC5'
                    }
                },
                {
                    values: ['5', 'Loại công trình'],
                    colSpan: [1, 1, 4],
                    names: [[2, LOAI_CONG_TRINH_RANGE]],
                    onChange: [
                        {
                            type: 'named',
                            watch: LOAI_CONG_TRINH_RANGE,
                            target: PROJECT_INFO,
                            key: LOAI_CONG_TRINH_RANGE
                        }
                    ],
                    Validation: {
                        cell: 2,
                        list: 'AA3:AA7'
                    }
                },
                {
                    values: ['6', 'Cấp công trình'], colSpan: [1, 1, 4], names: [[2, 'CAP_CONG_TRINH']], Validation: {
                        cell: 2,
                        list: 'AB3:AB7'
                    }
                },

            ],
            border: true,
            hAlign: ['Center'],
            font: 'Times New Roman',
        },
        {
            range: [
                ['', ''],
                {
                    values: ['II.', 'HỆ SỐ CÔNG TRÌNH'],
                    bold: true,
                },

            ]
        },
        {
            range: [
                {
                    values: ['STT', 'Tên Hệ Số', '', '', '', 'Giá trị'],
                    bold: true,
                    colSpan: [1, 4, 1],
                    fillColor: '#C6E0B4',
                    hCenter: true,
                    vCenter: true
                },
                { values: ['1', 'Hệ số điều chỉnh nhân công'], colSpan: [1, 4, 1] },
                { values: ['2', 'Hệ số điều chỉnh vật liệu'], colSpan: [1, 4, 1] },
                { values: ['3', 'Hệ số điều chỉnh nhân công'], colSpan: [1, 4, 1] },
                { values: ['4', 'Hệ số điều chỉnh ca máy'], colSpan: [1, 4, 1] },
                { values: ['4', 'Định mức chi phí trực tiếp khác (TT)'], colSpan: [1, 4, 1] },
                { values: ['6', 'Định mức chi phí chung (C)'], colSpan: [1, 4, 1] },
                { values: ['7', 'Định mức thu nhập chịu thuế tính trước (TL)'], colSpan: [1, 4, 1] },
                { values: ['8', 'Thuế suất thuế giá trị gia tăng (TGTGT-XD)'], colSpan: [1, 4, 1] },
                { values: ['9', 'Tỷ lệ chi phí XD nhà tạm tại hiện trường để ở và điều hành thi công'], colSpan: [1, , 1] },

            ],
            border: true,
            hAlign: ['Center'],
        }, {
            range: [
                [''],
                {
                    values: ['III.', 'LƯƠNG VÀ CÁC KHOẢN PHỤ CẤP'],
                    bold: true
                },
            ]
        }, {
            range: [
                {
                    values: ['STT', 'Tên Hệ Số', '', '', '', 'Giá trị'],
                    bold: true,
                    colSpan: [1, 4, 1],
                    fillColor: '#C6E0B4',
                    hCenter: true,
                    vCenter: true
                },
                { values: ['1', 'Mức lương đầu vào ( LNC ) ( đồng/tháng )'], colSpan: [1, 4, 1] },
                { values: ['2', 'Số ngày làm việc                  ( ngày/tháng )'], colSpan: [1, 4, 1] },
                { values: ['3', 'Phụ cấp lưu động'], colSpan: [1, 4, 1] },
                { values: ['4', 'Không ổn định sản xuất'], colSpan: [1, 4, 1] },
                { values: ['5', 'Lương phụ nghỉ lễ, tết hoặc nghỉ phép ...'], colSpan: [1, 4, 1] },
                { values: ['6', 'Chi phí có thể khoán trực tiếp cho người lao động'], colSpan: [1, 4, 1] },
                { values: ['7', 'Phụ cấp khu vực'], colSpan: [1, 4, 1] },
                { values: ['8', 'Phụ cấp độc hại'], colSpan: [1, 4, 1] },
                { values: ['9', 'Phụ cấp thu hút'], colSpan: [1, 4, 1] },
                { values: ['10', 'Phụ cấp trách nhiệm'], colSpan: [1, 4, 1] },
                { values: ['11', 'Phụ cấp bảo hiểm'], colSpan: [1, 4, 1] },
                { values: ['12', 'Phụ cấp vùng sâu, vùng xa, khó khăn, đắt đỏ'], colSpan: [1, 4, 1] },

            ],
            border: true,
            hAlign: ['Center'],
        }, {
            range: [
                [''],
                {
                    values: ['IV.', 'GIÁ ĐIỆN VÀ NĂNG LƯỢNG'],
                    bold: true
                },

            ]
        }, {
            range: [
                {
                    values: ['STT', 'Tên', 'Đơn vị', 'Giá trước thuế', 'Giá sau thuế'],
                    bold: true,
                    fillColor: '#C6E0B4',
                    hCenter: true,
                    vCenter: true
                },
                ['1', 'Diezel', 'lít'],
                ['2', 'Mazut', 'kg'],
                ['3', 'Điện', 'kWh'],
                ['4', 'Xăng A92', 'lít'],
            ],
            hAlign: ['Center', 'Left', 'Center'],
            border: true
        }, {
            range: [['Công trình dân dụng'], ['Công trình công nghiệp'], ['Công trình giao thông'], ['Công trình nông nghiệp và phát triển nông thôn'], ['Công trình hạ tầng kỹ thuật']],
            colWidth: [0],
            addr: 'AA3',
            color: 'BFBFBF'
        }, {
            range: [['Đặc biệt'], ['Cấp I'], ['Cấp II'], ['Cấp III'], ['Cấp IV']],
            colWidth: [0],
            addr: 'AB3',
            color: 'BFBFBF'
        }, {
            range: [['Nhóm A'], ['Nhóm B'], ['Nhóm C']],
            colWidth: [0],
            addr: 'AC3',
            color: 'BFBFBF'
        }
    ]
}

export const TONG_HOP_KHOI_LUONG_OBJECT = {
    title: ''
}