const { mysql } = require("../../config/options");
const knex = require('knex')(mysql);

async function insertProducts(product) {
    try {
        await knex('products').insert(product);
        console.log('Product inserted');
    } catch (err) {
        console.log(err);
    }
}

module.exports = insertProducts;