const {options} = require('./options/mariaDB.js')
const knex = require('knex')(options);

const cars = [
    { name: 'Audi', price: 10000 },
    { name: 'Nissan', price: 80000 }, 
    { name: 'Honda', price: 50000 },
    { name: 'Volvo', price: 90000 },
    { name: 'Hummer', price: 50000 },
    { name: 'Ford', price: 30000 },
    { name: 'Chevrolet', price: 20000 },
    { name: 'Ferrari', price: 100000 },
    ]

    knex('cars').insert(cars)
    .then(() => console.log('cars inserted'))
    .catch(err => console.log(err))
    .finally(() => {
        knex.destroy();
    })