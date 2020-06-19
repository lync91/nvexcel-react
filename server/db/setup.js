const knex = require('./index');

module.exports = {
    mauKhoiLuong: {
        create: () => {
            knex.schema.createTableIfNotExists('mauKhoiLuong', (table) => {
                table.increments();
                table.string('tenBophan');
                table.string('data');
                table.timestamps();
            }).then(() => {
                console.log('OKKK');
                
            })
        },
        drop: () => {
            knex.schema.dropTable('mauKhoiLuong').then(() => console.log('dropped'))
        }
    },
    status: () => {
        knex.raw('select 1+1 as result').then(function () {
            console.log('Connected');
            
          });
    }
}