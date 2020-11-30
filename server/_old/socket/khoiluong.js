var mongoose = require('mongoose');
var mauKhoiLuongCtrl = require('../db/controllers/maukhoiluong')
module.exports = function (socket) {
    socket.on('khoiluong/mau/add', (data, fn) => {
        mauKhoiLuongCtrl.add(data, (res) => fn(res));
    })
    socket.on('khoiluong/mau/getLoaiCongTrinh', (fn) => {
        mauKhoiLuongCtrl.getLoaiCongTrinh((err, res) => fn(res));
    })
    socket.on('khoiluong/mau/getlistMauKhoiLuong', (lct, fn) => {
        mauKhoiLuongCtrl.getMauKhoiLuong(lct, (err, res) => fn(res))
    })
    socket.on('khoiluong/mau/get', (id, fn) => {
        mauKhoiLuongCtrl.get(id, (err, res) => fn(res))
    })
    socket.on('khoiluong/mau/update', (data, fn) => {
        mauKhoiLuongCtrl.update(data, (err, res) => fn(res))
    })
}