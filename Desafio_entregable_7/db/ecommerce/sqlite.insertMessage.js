const { sqlite } = require('../../config/options');
const knex = require('knex')(sqlite);


async function insertMessage(message) {

    try {
        await knex('messages').insert(message);
        console.log('Message inserted');
    } catch (err) {
        console.log(err);
    }

}

module.exports = insertMessage;