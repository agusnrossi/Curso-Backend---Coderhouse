const {options} = require('./options/mariaDB.js')
const knex = require('knex')(options);

knex.from('cars').del().then((rows) => {
    console.log(rows);
}).catch((err) => {
    console.log(err);
}).finally(() => {
    knex.destroy();
});