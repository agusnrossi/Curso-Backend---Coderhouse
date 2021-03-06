const MongoContainer = require('../../container/mongoContainer')
const mongoose = require('mongoose')

const collection = 'carts'

const cartSchema = new mongoose.Schema({
    owner: {type: Object, ref:'users'},
    timestamp:{type:Date, min:Date.now()},
    products: [{type: Object, ref:'products'}]
})

class CartDaoMongo extends MongoContainer{
    constructor(){
        super(collection, cartSchema)
    }
} 

module.exports = CartDaoMongo