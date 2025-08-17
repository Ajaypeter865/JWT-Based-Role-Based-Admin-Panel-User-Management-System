const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('auth/register', {success :null , error : null})
    
})


router.get('/login', async (req, res) =>{
    res.render('auth/login', {success : null, error: null})
})

router.get('/admin', async(req, res) => {
    res.render('admin/user', {success: null, error: null})
})

module.exports = router