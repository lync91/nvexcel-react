var khoiluong = require('./khoiluong');
module.exports = function (socket) {
    khoiluong(socket)
    require('./dutoan')(socket)
}