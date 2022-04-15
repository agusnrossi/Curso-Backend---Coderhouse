const { sqlite } = require('../../config/options');
const knex = require('knex')(sqlite);


async function selectMessage() {

    try {
        const messages = await knex('messages').select();
        return messages;
    } catch (err) {
        console.log(err);
    }

}

module.exports = selectMessage;