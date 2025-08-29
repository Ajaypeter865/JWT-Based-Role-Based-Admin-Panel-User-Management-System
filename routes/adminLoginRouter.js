const express = require('express')
const router = express.Router()
const {adminValidator} = require('../middlewares/validation')
const { postAdmin, updateUser, addUser, deleteUser, blockUser, } = require('../controllers/adminControllers/adminLoginController')

router.post('/admin', postAdmin)
router.post('/admin/update-user', adminValidator,updateUser)
router.post('/admin/add-user', adminValidator,addUser)
router.post('/admin/delete-user', deleteUser)
router.post('/admin/block-user/:id', blockUser)






module.exports = router