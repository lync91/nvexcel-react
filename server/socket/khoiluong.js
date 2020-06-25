var mongoose = require('mongoose');
var mauKhoiLuongCtrl = require('../db/controllers/maukhoiluong')
module.exports = function (socket) {
    socket.on('khoiluong/mau/add', (data, fn) => {
        mauKhoiLuongCtrl.add(data, (res) => fn(res));
    })
    
}