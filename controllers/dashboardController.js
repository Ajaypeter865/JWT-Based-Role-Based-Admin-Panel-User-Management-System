const signupUser = require('../models/User')



async function getDashboard(req, res) {
    try {
        const user = await signupUser.findById(req.auth._id)
        if (!user) return res.render('auth/login', { success: null, error: 'No user found' })

        return res.render('dashboard/dashboard', { user, success: null, error: null })

    } catch (error) {
        console.error(error)
        res.render('auth/login', {  success: null, error: 'Failed to load Dashboard' })

    }
}

module.exports = {
    getDashboard
}