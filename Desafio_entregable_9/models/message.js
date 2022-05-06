const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    author: {
        authorEmail:{type: String, required: true},
        fyh:{type: Date, required:true}
    },
    text: {type: String, required: true}
});


module.exports = mongoose.model('Message', Schema);
