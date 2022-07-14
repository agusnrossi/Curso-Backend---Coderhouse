const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    message:[{type:mongoose.Schema.Types.ObjectId, ref:'message'}]

})

const user = mongoose.model('user', schema);

module.exports = user;