<<<<<<< HEAD
const MongoContainer = require('../../container/mongoContainer')
const mongoose = require('mongoose')
=======
const mongoContainer = require('../../../container/mongoContainer');
const {mongoose} = require('mongoose');
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847

const collection = 'carts'

const cartSchema = new mongoose.Schema({
    owner: {type: Object, ref:'users'},
    timestamp:{type:Date, min:Date.now()},
<<<<<<< HEAD
    products: [{type: Object, ref:'products'}]
=======
    prducts:[{type:Object,ref:'products'}],
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847
})

class CartDaoMongo extends MongoContainer{
    constructor(){
        super(collection, cartSchema)
    }
} 

module.exports = CartDaoMongo