const { normalize, denormalize, schema } = require('normalizr');
const { Message } = require('../models/message');




class Messages {
    constructor() {
    }


    async getMessage() {
        try {
            return this.normalizeMessages(await Message.find())

        } catch (err) {
            console.log(err);
        }

    }

    async addMessage(message) {

        try {
            console.log(message)
            return Message.create(message)
        } catch (err) {
            throw err
        }
    }

 normalizeMessages(message) {

    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'authorEmail' });

    const schemaMsg = new schema.Entity('post', {
        author: schemaAuthor
    }, { idAttribute: '_id' });

    const schemaMssgs = new schema.Entity('posts', {
        message: [schemaMsg]
    }, { idAttribute: 'id' });

    let mssgsId = {
        id: 'mensajes',
        messaage: msjs.map(mensaje => ({ ...msjs._doc, _id: JSON.stringify(msjs._id) }))
    }

    let mssgsIdNor = normalize(mssgsId, schemaMssgs);

    return mssgsIdNor;

}

}
module.exports = Messages