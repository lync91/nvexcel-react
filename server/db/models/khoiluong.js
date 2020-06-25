var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mauKhoiLuongSchema = new Schema({
    loaiCongTrinh: String,
    tenBoPhan: String,
    data: String
});
mauKhoiLuongSchema.statics.add = (data, fn) => {
    this.insert(data).then((res) => fn(res));
}
mauKhoiLuongSchema.statics.getLoaiCongTrinh = (fn) => {
}
mongoose.model("mauKhoiLuong", mauKhoiLuongSchema);
