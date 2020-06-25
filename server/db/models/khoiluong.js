var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mauKhoiLuongSchema = new Schema({
    tenBoPhan : String,
    data: String
});
mauKhoiLuongSchema.statics.add = (data, fn) => {
    this.insert(data).then((res) => fn(res));
}
mongoose.model("mauKhoiLuong", mauKhoiLuongSchema);
