const {mysql} = require("../../config/options");
const knex = require("knex")(mysql);



async function createTableProducts() {
    try {
        await knex.schema.createTable("products", table => {
            table.increments("id");
            table.string("name");
            table.integer("price");
            table.string("thumbnail");
        });
        console.log("Table products created");
    } catch (err) {
        console.log(err);
    }
}

module.exports = createTableProducts;