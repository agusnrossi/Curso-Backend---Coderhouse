const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    thumbnail:{type:String, required:true}
    
})

const productos = mongoose.model('productos', Schema);

module.exports=productos;