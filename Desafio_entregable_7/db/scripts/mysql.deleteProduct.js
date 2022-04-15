const { mysql } = require("../../config/options");
const knex = require('knex')(mysql);

async function deleteProduct(id) {
    try {
        await knex('products').where('id', id).del();
        console.log('Product deleted');
    } catch (err) {
        console.log(err);
    }
}

module.exports=deleteProduct;