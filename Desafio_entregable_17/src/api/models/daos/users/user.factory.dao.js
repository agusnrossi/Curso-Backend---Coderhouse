const UserDaoMongo = require('./user.mongo.dao');

class UserDAOSFactory {
  static getDAOS(type) {
    let userDAO;
    switch(type.toLowerCase()) {
      case 'mongo':
        userDAO = new UserDaoMongo('users');
        break;
      default:
        throw new Error('Invalid data source, please provide one of the following (MONGO)')
    }
    return {
      userDAO,
    }
  }
}

module.exports = UserDAOSFactory;