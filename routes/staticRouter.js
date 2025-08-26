const express = require('express')
const { getDashboard } = require('../controllers/dashboardController')
const { protectedAuth, protectedAuthAdmin } = require('../middlewares/auth')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('auth/register', { success: null, error: null })

})

router.get('/login', async (req, res) => {
    res.render('auth/login', { success: null, error: null })
})

router.get('/dashboard', protectedAuth, getDashboard)

router.get('/admin', async (req, res) => {
    return res.render('admin/adminLogin', { success: null, error: null })
})

router.get('/forgotpassword', async (req, res) => {
    return res.render('auth/forgotPassword', { success: null, error: null, message: null })
})



//  ROUTER - GET / USERS
// router.get('/users', protectedAuthAdmin,postAdmin, async (req, res) => {
//     console.log("Procted admin =", protectedAuthAdmin);

//     try {
//         const users = await userModel.find({}).sort({ createdAt: -1 })
//         return res.render('admin/users', { users, success: "Login Successfull", error: null })

//     } catch (error) {
//         console.error('Cant find router-get =', error);

//     }
// })




module.exports = router