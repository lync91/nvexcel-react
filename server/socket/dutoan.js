// dutoan/dongia/getkv
var duToanCtrl = require('../db/controllers/dutoan');
const { text } = require('express');
module.exports = function (socket) {
    socket.on('dutoan/dongia/getkv', (fn) => {
        duToanCtrl.getkv((err, res) => fn(res));
    })
    socket.on('dutoan/dongia/getdm', (kv, fn) => {
        duToanCtrl.getdm(kv, (err, res) => fn(res));
    })
    socket.on('dutoan/dongia/search', (kv, dg, text, fn) => {
        duToanCtrl.search(kv, dg, text, (err, data) => fn(data))
    })
}