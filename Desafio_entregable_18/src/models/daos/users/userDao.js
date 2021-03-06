const MongoContainer = require('../../container/mongoContainer')
const {errorLogger} = require('../../../utils/logger/index')
const mongoose = require('mongoose')

const collection = 'users'

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    bday: { type: Date, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
    cart: {type:Object, ref:'carts'}
})

class UserDaoMongo extends MongoContainer{
    constructor(){
        if (!UserDaoMongo.instance) {
          super(collection, userSchema);
          UserDaoMongo.instance = this;
          return this;
        }
        else {
          return UserDaoMongo.instance;
        }
    }

    async createUser(userItem) {
        try {
          const user = new this.model(userItem);
          await user.save();
          return user;
        }
        catch(error) {
          errorLogger.error(error);
        }
      };

      async getByEmail(email) {
        try {
            const document = await this.model.findOne({ email }, { __v: 0 });
            if (!document) {
                const errorMessage = `Wrong username or password`;
                throw new Error(errorMessage);
              } else return document;
              
        } catch (error) {
          errorLogger.error(error);
        }
      }
}

module.exports = UserDaoMongo;