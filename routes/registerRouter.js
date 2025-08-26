const express = require('express')
const router = express.Router()
const registerLoginController = require('../controllers/registerLoginController')
const auth = require('../middlewares/auth')

router.post('/register', registerLoginController.postRegisterUser)
router.post('/login', registerLoginController.postLoginUser)
router.post('/auth/forgotPassword', registerLoginController.forgotPassword)
router.post('/auth/enterOtp', registerLoginController.verifyOtp)



module.exports = router