const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    password: {
        type: String,
        required: true,
         minlength: 5
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
restOtp: Number,
    otpExpires: Date,
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel