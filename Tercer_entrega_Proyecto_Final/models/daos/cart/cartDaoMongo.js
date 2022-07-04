const mongoContainer = require('../../../container/mongoContainer');
const {mongoose} = require('mongoose');

const collections ='carts'

const cartSchema = new mongoose.Schema({
    owner: {type: Object, ref:'users'},
    timestamp:{type:Date, min:Date.now()},
    prducts:[{type:Object,ref:'products'}],
})


class cartDaoMongo extends mongoContainer {
    constructor() {
        super(collections,cartSchema);
    }
}

module.exports = cartDaoMongo;