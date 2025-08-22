const express = require('express')
const router = express.Router()
const {protectedAuthAdmin} = require('../middlewares/auth')

const {postAdmin} = require('../controllers/adminControllers/adminLoginController')

router.post('/admin',protectedAuthAdmin ,postAdmin)




module.exports = router