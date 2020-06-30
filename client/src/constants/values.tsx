export const MAU_KHOI_LUONG  = [['BẢNG MẪU KHỐI LƯỢNG CÔNG TRÌNH'], ['Công trình: '], ['Địa điểm: ']]
export const TIEN_LUONG_TITLE  = [['BẢNG TIÊN LƯỢNG CÔNG TRÌNH'], ['Công trình: '], ['Địa điểm: ']]

export const TONG_HOP_KHOI_LUONG_HEADER = [['Ký hiệu', 'STT', 'Mã đơn giá', 'Tên công việc', 'Đơn vị', 'Hệ số', 'Số lượng', 'Diễn giải', 'Khối lượng 1 cấu kiện', 'Khối lượng'
]]
export const AUTO_STT_FOMULA = '=IF(INDIRECT(CONCAT("A",ROW()))="+",COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"+"),IF(INDIRECT(CONCAT("A",ROW()))="#",ROMAN(COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"#")),IF(INDIRECT(CONCAT("A",ROW()))="HM","HM","")))'
export const KHOI_LUONG_DEFAULT_VALUES = [['HM', `${AUTO_STT_FOMULA}`,
'', '', '', '', '', '', '', ''
]]