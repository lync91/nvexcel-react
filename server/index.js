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
        const DGDb = 'HoChiMinh2016_XD+LD+SC+2018BS'
        const KV = 'HoChiMinh';
        connection = adodb.open({
            Database: `./temp/${KV}/${DGDb}.mdb`
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
                    DinhMuc.deleteMany({
                        DM: DGDb,
                        KV: KV
                    })
                    .exec((err, res) =>{
                        cb(null)
                    })
                },
                (cb) => {
                    DonGia.deleteMany({
                        DM: DGDb,
                        KV: KV
                    })
                    .exec((err, res) =>{
                        cb(null)
                    })
                },
                (cb) => {
                    GiaCaMay.deleteMany({
                        DM: DGDb,
                        KV: KV
                    })
                    .exec((err, res) =>{
                        cb(null)
                    })
                },
                (cb) => {
                    PhuLucVua.deleteMany({
                        DM: DGDb,
                        KV: KV
                    })
                    .exec((err, res) =>{
                        cb(null)
                    })
                },
                (cb) => {
                    TuDienVatTu.deleteMany({
                        DM: DGDb,
                        KV: KV
                    })
                    .exec((err, res) =>{
                        cb(null)
                    })
                },
                (cb) => {
                    _tbDinhMuc = tbDinhMuc.map(e => {
                        e.DM = DGDb
                        e.KV = KV
                        if (e.HPVT) e.HPVT = parseFloat(e.HPVT.replace(',', '.')) ? parseFloat(e.HPVT.replace(',', '.')) : 0
                        return e
                    })
                    DinhMuc.insertMany(_tbDinhMuc, (err, docs) => {
                        err ? cb(err) : cb(null, {tbDinhMuc: docs ? docs.length : 0})
                    })
                },
                (data, cb) => {
                    _tbDongia = tbDonGia.map(e => {
                        e.DM = DGDb
                        e.KV = KV
                        if (e.VLC) e.VLC = e.VLC.replace(',', '.')
                        if (e.VLP) e.VLP = e.VLP.replace(',', '.')
                        if (e.NC) e.NC = e.NC.replace(',', '.')
                        if (e.MTC) e.MTC = e.MTC.replace(',', '.')
                        return e
                    })
                    DonGia.insertMany(_tbDongia, (err, docs) => {
                        cb(err, {...data, ...{tbDonGia: docs ? docs.length : 0}})
                    })
                },
                (data, cb) => {
                    _tbGiaCaMay = tbGiaCaMay.map(e => {
                        e.DM = DGDb
                        e.KV = KV
                        if (e.SC) e.SC = e.SC.replace(',', '.')
                        if (e.DMKH) e.DMKH = e.DMKH.replace(',', '.')
                        if (e.HSTH) e.HSTH = e.HSTH.replace(',', '.')
                        if (e.DMSC) e.DMSC = e.DMSC.replace(',', '.')
                        if (e.DMCP) e.DMCP = e.DMCP.replace(',', '.')
                        // e.DMTH = e.DMTH.replace(',', '.')
                        if (e.HSNL) e.HSNL = e.HSNL.replace(',', '.')
                        if (e.CPKH) e.CPKH = e.CPKH.replace(',', '.')
                        if (e.CPSC) e.CPSC = e.CPSC.replace(',', '.')
                        if (e.CPK) e.CPK = e.CPK.replace(',', '.')
                        if (e.CPNL) e.CPNL = e.CPNL.replace(',', '.')
                        if (e.CPTL) e.CPTL = e.CPTL.replace(',', '.')
                        // e.CPTL = e.CPTL.replace(',', '.')
                        if (e.GCM) e.GCM = e.GCM.replace(',', '.')
                        if (e.NGG) e.NGG = e.NGG.replace(',', '.')
                        if (e.NGDC) e.NGDC = e.NGDC.replace(',', '.')
                        return e
                    })
                    // console.log(_tbDongia);
                    
                    GiaCaMay.insertMany(_tbGiaCaMay, (err, docs) => {
                        cb(err, {...data, ...{tbGiaCaMay: docs ? docs.length : 0}})
                    })
                },
                // (data, cb) => {
                //     _tbPhuLucVua = tbPhuLucVua.map(e => {
                //         e.DM = DGDb
                //         e.KV = KV
                //         e.HPXM = e.HPXM.replace(',', '.')
                //         e.HPC = e.HPC.replace(',', '.')
                //         e.HPD = e.HPD.replace(',', '.')
                //         e.HPV = e.HPV.replace(',', '.')
                //         e.HP1 = e.HP2.replace(',', '.')
                //         e.HP2 = e.HP2.replace(',', '.')
                //         e.HP3 = e.HP3.replace(',', '.')
                //         e.HP4 = e.HP4.replace(',', '.')
                //         return e
                //     })
                //     PhuLucVua.insertMany(_tbPhuLucVua, (err, docs) => {
                //         console.log(err);
                        
                //         cb(err, {...data, ...{tbPhuLucVua: docs.length}})
                //     })
                // },
                (data, cb) => {
                    _tbTuDienVatTu = tbTuDienVatTu.map(e => {
                        e.DM = DGDb
                        e.KV = KV
                        if (e.GG) e.GG = e.GG.replace(',', '.')
                        if (e.HSBH) e.HSBH = e.HSBH.replace(',', '.')
                        if (e.TLG) e.TLG = e.TLG.replace(',', '.')
                        return e
                    })
                    TuDienVatTu.insertMany(_tbTuDienVatTu, (err, docs) => {
                        cb(err, {...data, ...{tbTuDienVatTu: docs ? docs.length : 0}})
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

var DutoanCtrl = require('./db/controllers/dutoan');
const { parseNumbers } = require('xml2js/lib/processors');

app.get('/tradinhmuc/:dm', (req, res)=> {
    DutoanCtrl.get(req.params.dm, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
        
    })
})
app.get('/search', (req, res) => {
    DutoanCtrl.search('', '', '', (err, data) => {
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
