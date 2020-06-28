var mongoose = require('mongoose');
var MauKhoiLuong = mongoose.model('maukhoiluong');

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
            ]).exec((err, res) => fn(err, res))
    },
    getMauKhoiLuong: (lct, fn) => {
        MauKhoiLuong
        .aggregate( )
            .match({loaiCongTrinh: lct})
            .project({
                value: '$_id',
                label: '$tenBoPhan'
            })
            .exec((err, res) => fn(err, res))
    }
}