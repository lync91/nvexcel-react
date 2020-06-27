var app = require('express')();
var fs = require('fs');
var http = require('http');
var async = require('async');

var privateKey = fs.readFileSync('../cert/server.key', 'utf8');
var certificate = fs.readFileSync('../cert/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var https = require('https').createServer(credentials, app);
var io = require('socket.io')(https);


var setupdb = require('./db/setup');

fs.readdirSync(__dirname + '/db/models').forEach(function (filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/db/models/' + filename);
});


const mongoose = require('mongoose');
mongoose.connect('mongodb://nvcorp.net:27017/thietke', { useNewUrlParser: true, useUnifiedTopology: true });

var nvsocket = require('./socket');

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.get('/setup', (req, res) => {
    setupdb.mauKhoiLuong.create();
    res.send('OK')
});

var DinhMuc = mongoose.model('dinhmuc')
var DonGia = mongoose.model('dongia')
var GiaCaMay = mongoose.model('giacamay')
var PhuLucVua = mongoose.model('phulucvua')
var TuDienVatTu = mongoose.model('tudienvattu')

var adodb = require('database-js-adodb');

app.get('/napdongia', (req, res) => {
    (async () => {
        let connection, tbDinhMuc;
        const DGDb = 'DM_KS_TT10.2019'

        connection = adodb.open({
            Database: `./temp/${DGDb}.mdb`
        });
        try {
            tbDinhMuc = await connection.query("SELECT * FROM tbDinhMuc'");
            tbDonGia = await connection.query("SELECT * FROM tbDonGia'");
            tbGiaCaMay = await connection.query("SELECT * FROM tbGiaCaMay'");
            tbPhuLucVua = await connection.query("SELECT * FROM tbPhuLucVua'");
            tbTuDienVatTu = await connection.query("SELECT * FROM tbTuDienVatTu'");
            var source = {
                tbDinhMuc: tbDinhMuc.length,
                tbDonGia: tbDonGia.length,
                tbGiaCaMay: tbGiaCaMay.length,
                tbPhuLucVua: tbPhuLucVua.length,
                tbTuDienVatTu: tbTuDienVatTu.length
            }
            async.waterfall([
                (cb) => {
                    _tbDinhMuc = tbDinhMuc.map(e => {
                        e.DM = DGDb
                        e.HPVT = e.HPVT.replace(',', '.')
                        return e
                    })
                    DinhMuc.insertMany(_tbDinhMuc, (err, docs) => {
                        cb(null, {tbDinhMuc: docs.length})
                    })
                },
                (data, cb) => {
                    _tbDongia = tbDonGia.map(e => {
                        e.DM = DGDb
                        e.VLC = e.VLC.replace(',', '.')
                        e.VLP = e.VLP.replace(',', '.')
                        e.NC = e.NC.replace(',', '.')
                        e.MTC = e.MTC.replace(',', '.')
                        return e
                    })
                    DonGia.insertMany(_tbDongia, (err, docs) => {
                        cb(null, {...data, ...{tbDonGia: docs.length}})
                    })
                },
                (data, cb) => {
                    _tbGiaCaMay = tbGiaCaMay.map(e => {
                        e.DM = DGDb
                        e.SC = e.SC.replace(',', '.')
                        e.DMKH = e.DMKH.replace(',', '.')
                        e.HSTH = e.HSTH.replace(',', '.')
                        e.DMSC = e.DMSC.replace(',', '.')
                        e.DMCP = e.DMCP.replace(',', '.')
                        // e.DMTH = e.DMTH.replace(',', '.')
                        e.HSNL = e.HSNL.replace(',', '.')
                        e.CPKH = e.CPKH.replace(',', '.')
                        e.CPSC = e.CPSC.replace(',', '.')
                        e.CPK = e.CPK.replace(',', '.')
                        e.CPNL = e.CPNL.replace(',', '.')
                        e.CPTL = e.CPTL.replace(',', '.')
                        // e.CPTL = e.CPTL.replace(',', '.')
                        e.GCM = e.GCM.replace(',', '.')
                        e.NGG = e.NGG.replace(',', '.')
                        e.NGDC = e.NGDC.replace(',', '.')
                        return e
                    })
                    // console.log(_tbDongia);
                    
                    GiaCaMay.insertMany(_tbGiaCaMay, (err, docs) => {
                        cb(err, {...data, ...{tbGiaCaMay: docs.length}})
                    })
                },
                (data, cb) => {
                    _tbPhuLucVua = tbPhuLucVua.map(e => {
                        e.DM = DGDb
                        e.HPXM = e.HPXM.replace(',', '.')
                        e.HPC = e.HPC.replace(',', '.')
                        e.HPD = e.HPD.replace(',', '.')
                        e.HPV = e.HPV.replace(',', '.')
                        e.HP1 = e.HP2.replace(',', '.')
                        e.HP2 = e.HP2.replace(',', '.')
                        e.HP3 = e.HP3.replace(',', '.')
                        e.HP4 = e.HP4.replace(',', '.')
                        return e
                    })
                    PhuLucVua.insertMany(_tbPhuLucVua, (err, docs) => {
                        cb(err, {...data, ...{tbPhuLucVua: docs.length}})
                    })
                },
                (data, cb) => {
                    _tbTuDienVatTu = tbTuDienVatTu.map(e => {
                        e.DM = DGDb
                        e.GG = e.GG.replace(',', '.')
                        e.HSBH = e.HSBH.replace(',', '.')
                        e.TLG = e.TLG.replace(',', '.')
                        return e
                    })
                    TuDienVatTu.insertMany(_tbTuDienVatTu, (err, docs) => {
                        cb(err, {...data, ...{tbTuDienVatTu: docs.length}})
                    })
                }
            ], (err, data) => {
                if (!err) {
                    var obj = {
                        source: source,
                        res: data
                    }
                    res.json(obj)
                    
                } else {
                    console.log(err);
                    
                    // res.send(err)
                }
            })
            // console.log(_tbDinhMuc);
        } catch (error) {
            console.log(error);
        } finally {
            await connection.close();
        }
    })();
});

var DutoanCtrl = require('./db/controllers/dutoan')

app.get('/tradinhmuc/:dm', (req, res)=> {
    DutoanCtrl.get(req.params.dm, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
        
    })
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('hello', (fn) => {
        console.log('Hello');
        fn('hello')
    })
    socket.on('elog', (data) => {
        io.emit('elog', data)
    })
    nvsocket(socket);
});

https.listen(8080, () => {
    console.log('listening on *:8080');
});
