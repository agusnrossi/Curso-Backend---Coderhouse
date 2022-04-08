const {options} = require('./options/mariaDB.js')
const knex = require('knex')(options);

knex.from('cars').select('*').then((rows) => {
    for (rows of rows) {
        console.log(`${rows['id']} - ${rows['name']} - ${rows['price']}`);
    }
}).catch((err) => {
    console.log(err);
}).finally(() => {
    knex.destroy();
});