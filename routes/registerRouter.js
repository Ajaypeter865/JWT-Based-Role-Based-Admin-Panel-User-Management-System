const express = require('express')
const router = express.Router()
const registerLoginController = require('../controllers/registerLoginController')
const {registervalidator} = require('../middlewares/validation')

router.post('/register',registervalidator, registerLoginController.postRegisterUser)
router.post('/login', registerLoginController.postLoginUser)
router.post('/auth/forgotPassword', registerLoginController.forgotPassword)
router.post('/auth/enterOtp', registerLoginController.verifyOtp)
router.post('/auth/resetPassword/', registerLoginController.restPassword)



module.exports = router