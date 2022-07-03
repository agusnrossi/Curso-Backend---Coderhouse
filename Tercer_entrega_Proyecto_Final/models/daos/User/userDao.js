const MongoContainer=require('../../../container/mongoContainer');
const mongoose=require('mongoose');
const {loggerError}=require('../../../logger/index');


const collection='users'

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    lastName:{type:String,required:true},
    phone:{type:String,required:true},
    birthDate:{type:Date,required:true},
    age:{type:Number,required:true},
    address:{type:String,required:true},
    image:{type:String,required:true},
    cart:{type:Object,ref:'carts'},
})

class userDaoMongo extends MongoContainer{
    constructor(){
        if(!userDaoMongo.instance){
            super(collection,userSchema);
            userDaoMongo.instance=this;
            return this;
        }
        else{
            return userDaoMongo.instance;
        }
    }

    async createUser(userItem) {
        try {
          const user = new this.model(userItem);
          await user.save();
          return user;
        }
        catch(error) {
          loggerError.error(error);
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
          loggerError.error(error);
        }
      }

}


module.exports=userDaoMongo;