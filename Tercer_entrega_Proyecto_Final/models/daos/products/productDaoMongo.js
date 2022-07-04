const mongoContainer = require('../../../container/mongoContainer');
const {mongoose }= require('mongoose');
const {loggerError}=require('../../../logger/index');


const collections ='products'


const productSchema = new mongoose.Schema({
    id:{type:Number,unique:true,required:true},
    code:{type:Number,unique:true,required:true},
    name:{type:String,required:true},
    desc:{type:String,required:true},
    image:{type:String},
    desc:{type:String},
    price:{type:Number,required:true,min:0},
    stock:{type:Number,required:true,min:0},
    timestamp:{type:Date,default:Date.now,required:true}
})



class productDaoMongo extends mongoContainer {
    constructor() {
        super(collections,productSchema);
    }
    async createItem(resourceItem) {
        try {
          const newItem = new this.model(resourceItem);
          await newItem.save();
          return newItem;
        }
        catch (err) {
          loggerError.error(new Error(error));
        }
      }
}

module.exports = productDaoMongo;