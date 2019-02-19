const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        default: null
    },
    phone: {
        type: Number,
        default: null
    },
    avator: {
        type: String,
        default: null
    },
    loginId: Number,
    location: String
})

const Users = mongoose.model('Users',userSchema)

module.exports = Users;