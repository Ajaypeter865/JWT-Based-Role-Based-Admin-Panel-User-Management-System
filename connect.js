const mongoose = require('mongoose')

function connectMongoDB(url) {
    return mongoose.connect(url)
}

module.exports = {
    connectMongoDB
}