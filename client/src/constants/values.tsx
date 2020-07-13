export const MAU_KHOI_LUONG  = [['BẢNG MẪU KHỐI LƯỢNG CÔNG TRÌNH'], ['Công trình: '], ['Địa điểm: ']]
export const TIEN_LUONG_TITLE  = [['BẢNG TIÊN LƯỢNG CÔNG TRÌNH'], ['Công trình: '], ['Địa điểm: ']]

export const TONG_HOP_KHOI_LUONG_HEADER = [['Ký hiệu', 'STT', 'Mã đơn giá', 'Tên công việc', 'Đơn vị', 'Hệ số', 'Số lượng', 'Diễn giải', 'Khối lượng 1 cấu kiện', 'Khối lượng'
]]
export const AUTO_STT_FOMULA = '=IF(INDIRECT(CONCAT("A",ROW()))="+",COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"+"),IF(INDIRECT(CONCAT("A",ROW()))="#",ROMAN(COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"#")),IF(INDIRECT(CONCAT("A",ROW()))="HM","HM","")))'
export const KHOI_LUONG_DEFAULT_VALUES = [['HM', `${AUTO_STT_FOMULA}`,
'', '', '', '', '', '', '', ''
]]

export const DAU_VAO_OBJECT = {
    name: 'Đầu vào',
    colwidth: [30, 220, 80, 80, 80],
    printArea: 'A:F',
    pageSize: 'A4',
    contents: [
        {values: {addr: 'A1', values: [
            ['THÔNG TIN CÔNG TRÌNH VÀ DỮ LIỆU ĐẦU VÀO', ''],
            ['I', 'THÔNG TIN CHUNG'],
            ['1', 'Tên công trình'],
            ['2', 'Địa điểm'],
            ['3', 'Chủ đầu tư'],
            ['4', 'Loại công trình'],
            ['5', 'Cấp công trình'],
            ['II', 'Hệ số công trình'],
            ['1', 'Hệ số điều chỉnh nhân công'],
            ['2', 'Hệ số điều chỉnh vật liệu'],
            ['3', 'Hệ số điều chỉnh nhân công'],
            ['4', 'Hệ số điều chỉnh ca máy'],
            ['5', 'Định mức chi phí trực tiếp khác (TT)'],
            ['6', 'Định mức chi phí chung (C)'],
            ['7', 'Định mức thu nhập chịu thuế tính trước (TL)'],
            ['8', 'Thuế suất thuế giá trị gia tăng (TGTGT-XD)'],
            ['9', 'Tỷ lệ chi phí XD nhà tạm tại hiện trường để ở và điều hành thi công'],
            ['III', 'LƯƠNG VÀ CÁC KHOẢN PHỤ CẤP'],
            ['1', 'Mức lương đầu vào ( LNC ) ( đồng/tháng )'],
            ['2', 'Số ngày làm việc                  ( ngày/tháng )'],
            ['3', 'Phụ cấp lưu động'],
            ['4', 'Không ổn định sản xuất'],
            ['5', 'Lương phụ nghỉ lễ, tết hoặc nghỉ phép ...'],
            ['6', 'Chi phí có thể khoán trực tiếp cho người lao động'],
            ['7', 'Phụ cấp khu vực'],
            ['8', 'Phụ cấp độc hại'],
            ['9', 'Phụ cấp thu hút'],
            ['10', 'Phụ cấp trách nhiệm'],
            ['11', 'Phụ cấp bảo hiểm'],
            ['12', 'Phụ cấp vùng sâu, vùng xa, khó khăn, đắt đỏ'],
            ['IV', 'GIÁ ĐIỆN VÀ NANG LƯỢNG'],
            ['1', 'Diezel'],
            ['2', 'Mazut'],
            ['3', 'Điện'],
            ['4', 'Xăng A92'],
        ]},
        font: 'Times New Roman'
    },
    ]
}

export const TONG_HOP_KHOI_LUONG_OBJECT = {
    title: ''
}