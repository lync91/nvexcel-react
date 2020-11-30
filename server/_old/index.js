var express = require("express");
var {graphqlHTTP} = require("express-graphql");
var { getProducts, addProduct } = require("./data/products");
var { getPeople, addPerson } = require("./data/person");
var fs = require('fs');
var privateKey = fs.readFileSync('../cert/server.key', 'utf8');
var certificate = fs.readFileSync('../cert/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };


// Construct a schema, using GraphQL schema language
const schema = require('./data/schema')

const throwDice = (numDice, numSides) => {
  const dices = [];
  for (var i = 0; i < numDice; i++) {
    const dice = Math.floor(numSides * Math.random());
    dices.push(dice);
  }
  return dices;
};

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
  rollDice: args => {
    const { numDice, numSides } = args;
    console.log("args", args);
    return throwDice(numDice, numSides);
  },
  products: () => {
    return getProducts();
  },
  product: ({ id }) => {
    const products = getProducts();
    return products.find(p => p.id === id);
  },
  createProduct: args => {
    const { name, description } = args;
    const newProduct = addProduct(name, description);
    return `Created: ${newProduct.id} ${newProduct.name} - ${
      newProduct.description
    }`;
  },
  people: () => {
    return getPeople();
  },
  createPerson: args => {
    const { person } = args;
    return addPerson(person);
  }
};

var setupdb = require('./db/setup');

fs.readdirSync(__dirname + '/db/models').forEach(function (filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/db/models/' + filename);
});


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thietke', { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

var https = require('https').createServer(credentials, app);
var io = require('socket.io')(https);

var cors = require("cors");

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
https.listen(8083);
console.log("Running a GraphQL API server at localhost:8083/graphql");

// query with list CHECK
// query with param, CHECK
// mutator, CREATE, DELETE, UPDATE , CHECK

// correct broken images on NGRX