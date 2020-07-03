// dutoan/dongia/getkv
var duToanCtrl = require('../db/controllers/dutoan')
module.exports = function (socket) {
    socket.on('dutoan/dongia/getkv', (fn) => {
        duToanCtrl.getkv((err, res) => fn(res));
    })
    socket.on('dutoan/dongia/getdm', (kv, fn) => {
        duToanCtrl.getdm(kv, (err, res) => fn(res));
    })
}