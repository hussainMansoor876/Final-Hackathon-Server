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
    id: Number,
    lat: Number,
    lng: Number,
    services: {
        type: Array,
        default: null
    },
    chat: {
        type: Object,
        default: null
    }
})

const Users = mongoose.model('Users',userSchema)

module.exports = Users;