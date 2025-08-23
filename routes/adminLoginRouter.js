const express = require('express')
const router = express.Router()
const { protectedAuthAdmin } = require('../middlewares/auth')

const { postAdmin, updateUser ,addUser} = require('../controllers/adminControllers/adminLoginController')

router.post('/admin',  postAdmin)

router.post('/admin/update-user', updateUser)

router.post('/admin/add-user', addUser)




module.exports = router