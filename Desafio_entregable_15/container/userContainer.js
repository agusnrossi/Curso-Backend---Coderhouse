const  mongodbContainer = require('./mongodbContainer');
const usuarios = require('../models/user');
const mongoose = require('mongoose');



const Usuarios = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    message:[{type:mongoose.Schema.Types.ObjectId, ref:'message'}]
})


const  collection='users';

class User extends mongodbContainer{
    constructor() {
      
       if(!User.instance){
            super(collection,Usuarios)
            User.instance = this;
            return this
        }
        else{
            return User.instance
        }
    } 
    async createUser(userItem){
        try {
            const user = new this.model(userItem);
            await user.save();
            return user;
          }
          catch(error) {
            throw new Error(error);
          }
        };

    async getByEmail(email){
        try {
            const document = await this.model.findOne({ email }, { __v: 0 });
            if (!document) {
                const errorMessage = `Wrong username or password`;
                throw new Error(errorMessage);
              } else return document;
              
        } catch (error) {
            throw new Error(error);
        }
      }  
}


module.exports = User;

