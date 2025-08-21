const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
})

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel