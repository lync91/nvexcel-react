var mongoose = require('mongoose');
var MauKhoiLuong = mongoose.model('mauKhoiLuong');

module.exports = {
    add: (data, fn) => {
        var mkl = new MauKhoiLuong(data);
        mkl.save().then((res) => fn(res))
    }
}