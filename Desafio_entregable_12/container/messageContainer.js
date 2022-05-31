const { normalize, denormalize, schema } = require('normalizr');
const mensajes = require('../models/message');

class Messages {
    constructor() {
    }


    async getMessage() {
        try {
            return this.normalizeMessages(await mensajes.find())

        } catch (err) {
            throw err
        }

    }

    async addMessage(message) {

        try {
            console.log(message)
            return mensajes.create(message)
        } catch (err) {
            throw err
        }
    }

 normalizeMessages(mensajes) {

    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'authorEmail' });

    const schemaMsg = new schema.Entity('post', {
        author: schemaAuthor
    }, { idAttribute: '_id' });

    const schemaMssgs = new schema.Entity('posts', {
        mensajes: [schemaMsg]
    }, { idAttribute: 'id' });

    let mssgsId = {
        id: 'mensajes',
        mensajes: mensajes.map(mensaje => ({ ...mensaje._doc, _id: JSON.stringify(mensaje._id) }))
    }

    let mssgsIdNor = normalize(mssgsId, schemaMssgs);

    return mssgsIdNor;

}

}
module.exports = Messages