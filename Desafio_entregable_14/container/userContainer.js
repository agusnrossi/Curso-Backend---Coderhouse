const  mongodbContainer = require('./mongodbContainer');
const usuarios = require('../models/user');
const mongoose = require('mongoose');
const { errorLogger } = require('../utils/logger/index');


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
            return this
        }
        else{
            return User.instance
        }
    } 
    async createUser(item){
        try{
            return await usuarios.create(item)
        }catch(err){
            errorLogger.error(err);
        }
    }

    async getByEmail(email){
        const errorMessage = 'No se encontro el usuario o contraseña';
        try{
            return await usuarios.findOne({email: email},{__v:0})
        }
        catch(errorMessage){
            errorLogger.error(errorMessage);
        }
    } 
}


module.exports = User;

