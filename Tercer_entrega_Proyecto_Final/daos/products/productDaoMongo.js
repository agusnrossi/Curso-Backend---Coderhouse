const mongoContainer = require('../../container/mongoContainer');
const mongoose = require('mongoose');


const collections ='products'


const productSchema = new mongoose.Schema({
    id:{type:Number,unique:true,required:true},
    code:{type:Number,unique:true,required:true},
    name:{type:String,required:true},
    desc:{type:String,required:true},
    thumbnail:{type:String},
    desc:{type:String},
    price:{type:Number,required:true,min:0},
    stock:{type:Number,required:true,min:0},
    timestamp:{type:Date,default:Date.now,required:true}
})



class prductDaoMongo extends mongoContainer {
    constructor() {
        super(collections,productSchema);
    }
}

module.exports = prductDaoMongo;