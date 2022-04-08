const {options}=require('./options/mariaDB.js')
const knex=require('knex')(options);

knex.from('cars').where('price  ', '>', '9000').update({price: '9500'})
.then(() => console.log('cars updated'))
.catch(err => console.log(err))
.finally(() => {
    knex.destroy();
})