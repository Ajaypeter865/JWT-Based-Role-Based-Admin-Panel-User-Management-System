// Imports
require('dotenv').config()
const express = require('express')
const { connectMongoDB } = require('./connect')
const path = require('path')
const PORT = process.env.PORT

// Module exports
const UserRouter = require ('./routes/user')
// Middlewares
const app = express()



// Set ejs
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// App.get
app.get('/', UserRouter)


connectMongoDB(process.env.DB_URI).then(() => {
    console.log('mongodb conneted');

})

app.listen(PORT, () => {
    console.log(`Server start at PORT ${PORT}`);

})