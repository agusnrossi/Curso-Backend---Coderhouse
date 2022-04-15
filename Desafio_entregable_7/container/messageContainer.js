const createTableMessages = require("../db/ecommerce/sqlite.createTable.js");
const insertMessage = require("../db/ecommerce/sqlite.insertMessage.js");
const selectMessages = require("../db/ecommerce/sqlite.selectMessage.js");


class Messages {
    constructor() {
       
        this.id = 0;
        this.elements = [];

    }

    async initMessage() {
        try {
            await createTableMessages();
            console.log("Table messages created");
        } catch (err) {
            console.log(err);
        }

    }

    async getMessages() {
        await this.initMessage();
        try {
            const messages = await selectMessages();
            return messages;
        } catch (error) {
            console.log("No se pudo leer el archivo.");
        }
    }

    async insertMessage(message) {
        try {
            await insertMessage(message);
            console.log('Message inserted');
        } catch (err) {
            console.log(err);
        }

    }

    async saveMessage(message) {
        const messages = await this.getMessages();
        let newID
        if (messages.length == 0) {
            newID = 1;
        } else {
            newID = messages[messages.length - 1].id + 1;
        }

        const newMessage = { ...message, id: newID };
        this.elements.push(newMessage);

        try {
            await insertMessage(newMessage);
            return newID
        } catch (err) {
            console.log(`Error al guardar:${err}`)
        }
    }


}

module.exports = Messages