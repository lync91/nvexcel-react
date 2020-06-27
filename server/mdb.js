var fs = require('fs');
var mongoose = require('mongoose');

fs.readdirSync(__dirname + '/db/models').forEach(function (filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/db/models/' + filename);
});

mongoose.connect('mongodb://nvcorp.net:27017/thietke', {useNewUrlParser: true, useUnifiedTopology: true});

var DinhMuc = mongoose.model('dinhmuc')
var Dongia = mongoose.model('dongia')
var GiaCaMay = mongoose.model('giacamay')
var PhuLucVua = mongoose.model('phulucvua')
var TuDienVatTu = mongoose.model('tudienvattu')

var adodb = require('database-js-adodb');
const { parseNumbers } = require('xml2js/lib/processors');

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
      _tbDinhMuc = tbDinhMuc.map(e => {
        var str = `${e.HPVT}`
        e.DM = DGDb
        e.HPVT = str.replace(',', '.')
        return e
      })
      DinhMuc.insertMany(_tbDinhMuc, (err, docs) => {
        console.log(docs);
        
      })
      
      // console.log(_tbDinhMuc);
  } catch (error) {
      console.log(error);
  } finally {
      await connection.close();
  }
})();