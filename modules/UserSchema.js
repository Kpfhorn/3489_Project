var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
   email: {
       type: String,
       unique: true,
       required: true,
       trim: true
   },

    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    stock_list: [String]
});

module.exports = mongoose.model('User', UserSchema);