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



router.get('/admin', protectedAuthAdmin,async (req, res) => {
    return res.render('admin/adminLogin', { success: null, error: null })
})




module.exports = router