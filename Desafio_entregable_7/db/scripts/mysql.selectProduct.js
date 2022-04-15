const {mysql} = require("../../config/options");
const knex = require("knex")(mysql);

async function selectProducts(){

    try{
        const products = await knex('products').select();
        return products;
    }
    catch(err){
        console.log(err);
    }

}

module.exports = selectProducts;