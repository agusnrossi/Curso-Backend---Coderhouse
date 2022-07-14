const MessageMongoDAO = require('./message.mongo.dao');

class MessageDAOSFactory {
    static getDAOS(type) {
        let messageDAO;
        switch(type.toLowerCase()) {
          case 'mongo':
            messageDAO = new MessageMongoDAO('messages');
            break;
          default:
            throw new Error('Invalid data source, please provide one of the following (MONGO)')
        }
        return {
          messageDAO,
        }
      }
    }
    
    module.exports = MessageDAOSFactory; 