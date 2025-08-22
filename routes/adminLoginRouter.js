const express = require('express')
const router = express.Router()
const { protectedAuthAdmin } = require('../middlewares/auth')

const { postAdmin, updateUser } = require('../controllers/adminControllers/adminLoginController')

router.post('/admin',  postAdmin)

router.post('/admin/update-user', updateUser)




module.exports = router