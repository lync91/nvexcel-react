var mongoose = require('mongoose');
var MauKhoiLuong = mongoose.model('maukhoiluong');

module.exports = {
    add: (data, fn) => {
        var mkl = new MauKhoiLuong(data);
        mkl.save().then((res) => fn(res))
    },
    get: (id, fn) => {
        MauKhoiLuong.findOne({_id: id})
        .exec((err, res) => fn(err, res))
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
    },
    update: (data, fn) => {
        MauKhoiLuong.findByIdAndUpdate({_id: data.id}, {data: data.data, tenBoPhan: data.tenBoPhan}, {new: true})
        .exec((err, res) => fn(err, res))
    }
}