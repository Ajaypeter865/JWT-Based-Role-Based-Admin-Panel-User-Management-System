const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel