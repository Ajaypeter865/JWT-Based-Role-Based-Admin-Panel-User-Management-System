const express = require('express')
const router = express.Router()
const registerLoginController = require('../controllers/registerLoginController')

router.post('/register', registerLoginController.postRegisterUser)


module.exports = router