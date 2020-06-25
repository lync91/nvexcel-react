var mongoose = require('mongoose');
const { fn } = require('..');
var MauKhoiLuong = mongoose.model('mauKhoiLuong');

module.exports = {
    add: (data, fn) => {
        var mkl = new MauKhoiLuong(data);
        mkl.save().then((res) => fn(res))
    },
    getLoaiCongTrinh: (fn) => {
        MauKhoiLuong.aggregate([
            {$group: { _id: "$loaiCongTrinh"}},
            {$project: {
                _id: -1,
                value: '$_id',
                label: '$_id'
            }}
            ]).exec((err, res) => fn(res))
    }
}