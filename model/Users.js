const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        default: null
    },
    age: {
        type: Number,
        default: null
    },
    avator: {
        type: String,
        default: null
    },
    password: String,
    loginId: String,
})

const Users = mongoose.model('Users',userSchema)

module.exports = Users;