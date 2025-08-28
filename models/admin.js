const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
         minlength : 5,
    }
})

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel