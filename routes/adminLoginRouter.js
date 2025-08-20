const express = require('express')
const router = express.Router()

const {postAdmin} = require('../controllers/adminControllers/adminLoginController')

router.post('/admin/login', postAdmin)




module.exports = router