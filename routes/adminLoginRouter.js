const express = require('express')
const router = express.Router()



router.get('/admin/login', async (req, res) => {
    return res.render('admin/adminLogin', { success: null, error: null })
})

module.exports = router