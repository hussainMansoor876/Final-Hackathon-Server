const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    avator: String,
    password: String
})

const Users = mongoose.model('Users',userSchema)

module.exports = Users;