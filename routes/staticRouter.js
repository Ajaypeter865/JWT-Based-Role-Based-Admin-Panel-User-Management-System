const express = require('express')
const userModel = require('../models/User')
const { getDashboard } = require('../controllers/dashboardController')

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('auth/register', { success: null, error: null })

})


router.get('/login', async (req, res) => {
    res.render('auth/login', { success: null, error: null })
})


router.get('/dashboard', getDashboard)


router.get('/users', async (req, res) => {
    try {
        const users = userModel.find({})
        res.render('admin/users', { users, success: 'Login succesfull', error: null })
    } catch (error) {
        console.log(error)
        res.render('admin/users', { users: [], success: null, error: 'Failed to load users' })

    }
})

module.exports = router