var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        database: 'dutoan'
    }
});
module.exports = knex;