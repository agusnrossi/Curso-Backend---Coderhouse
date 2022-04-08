const { options } = require('./options/mariaDB.js')
const knex = require('knex')(options);

knex.schema.createTable('cars', table => {
    table.increments('id');
    table.string('name', 200);
    table.integer('price', 5);
})
    .then(() => console.log('table created'))
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy();
    })


