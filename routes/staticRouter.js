const express = require('express')
const userModel = require('../models/User')
const {getDashboard} = require('../controllers/dashboardController')

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('auth/register', { success: null, error: null })

})


router.get('/login', async (req, res) => {
    res.render('auth/login', { success: null, error: null })
})


router.get('/dashboard', getDashboard)
// BACKUP DASH BOARD

// router.get('/dashboard', async (req, res) => {
//     try {
//         const user = await userModel.findOne({})
//         res.render('dashboard/dashboard', {user, success: null, error: null })
//     } catch (error) {
//         console.error(error)
//         res.render('dashboard/dashboard', { user, success: null, error: 'Failded to load dashboard' })

//     }
// })

router.get('/users', async (req, res) => {
    try {
        const users = userModel.find({ users })
        res.render('admin/users', { users, success: 'Login succesfull', error: null })
    } catch (error) {
        console.log(error)
        res.render('admin/users', { users: [], success: null, error: 'Failed to load users' })

    }
})

module.exports = router