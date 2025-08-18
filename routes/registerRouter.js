const express = require('express')
const router = express.Router()
const registerLoginController = require('../controllers/registerLoginController')
const auth = require('../middlewares/auth')

router.post('/register', registerLoginController.postRegisterUser)
router.post('/login', registerLoginController.postLoginUser, auth.protectedAuth)


module.exports = router