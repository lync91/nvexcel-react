var app = require('express')();
var fs = require('fs');
// var https = require('https');
var async = require('async');

var privateKey = fs.readFileSync('../cert/server.key', 'utf8');
var certificate = fs.readFileSync('../cert/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var https = require('https').createServer(credentials, app);
var io = require('socket.io')(https);

// var { graphqlHTTPs } = require('express-graphql');
// var { buildSchema } = require('graphql');

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };
   
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });


var setupdb = require('./db/setup');

fs.readdirSync(__dirname + '/db/models').forEach(function (filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/db/models/' + filename);
});


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thietke', { useNewUrlParser: true, useUnifiedTopology: true });

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

var DutoanCtrl = require('./db/controllers/dutoan');

app.get('/tradinhmuc/:dm', (req, res) => {
    var dm = new DinhMuc({})
    dm.save()
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


// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var root = { hello: () => 'Hello world!' };

// app.use('/graphql', graphqlHTTPs({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
// }));


https.listen(8080, () => {
    console.log('listening on *:8080');
});
