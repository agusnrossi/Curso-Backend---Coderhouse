const {sqlite} = require('../../config/options');
const knex = require('knex')(sqlite);

async function createTableMessages() {

    try {
        await knex.schema.createTable('messages', table => {
            table.increments('id').primary();
            table.string('email');
            table.timestamp('date');
            table.string('message',500);
        });
        console.log('Table messages created');
    } catch (err) {
        console.log(err);
    }
}

module.exports = createTableMessages;