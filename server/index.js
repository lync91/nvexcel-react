var app = require('express')();
var fs = require('fs');
var http = require('http');

var privateKey  = fs.readFileSync('../cert/server.key', 'utf8');
var certificate = fs.readFileSync('../cert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var https = require('https').createServer(credentials, app);
var io = require('socket.io')(https);


var setupdb = require('./db/setup');

fs.readdirSync(__dirname + '/db/models').forEach(function (filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/db/models/' + filename);
  });
  

const mongoose = require('mongoose');
mongoose.connect('mongodb://nvcorp.net:27017/thietke', {useNewUrlParser: true, useUnifiedTopology: true});

var nvsocket = require('./socket');

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.get('/setup', (req, res) => {
    setupdb.mauKhoiLuong.create();
    res.send('OK')
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('hello', (fn) => {
        console.log('Hello');
        fn('hello')
    })
    nvsocket(socket);
  });

https.listen(8080, () => {
    console.log('listening on *:8080');
});
