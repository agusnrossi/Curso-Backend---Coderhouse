const mongoContainer = require('../../container/mongoContainer');
const mongoose = require('mongoose');

const collections ='carts'

const cartSchema = new mongoose.Schema({
    id:{type:Number,unique:true,required:true},
    timestamp:{type:Date,default:Date.now},
    prducts:[{type:Object,ref:'products'}],
})


class cartDaoMongo extends mongoContainer {
    constructor() {
        super(collections,cartSchema);
    }
}

module.exports = cartDaoMongo;