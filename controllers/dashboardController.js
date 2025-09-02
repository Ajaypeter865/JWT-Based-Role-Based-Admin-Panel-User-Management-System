// @ts-nocheck
const userModel = require('../models/User')
const signupUser = require('../models/User')



async function getDashboard(req, res) {
    try {
        // const user = await signupUser.findOne({ email })
        // console.log('user =',user);
        const users = await signupUser.findById(req.auth._id)
        if (!users) return res.render('auth/login', { success: null, error: 'No user found' })
        

        return res.render('dashboard/dashboard', { success: null, error: null })

    } catch (error) {
        console.error('Error from getDashboard', error.meessage, error.stack)
        res.render('auth/login', { success: null, error: 'Failed to load Dashboard' })

    }
}

module.exports = {
    getDashboard
}