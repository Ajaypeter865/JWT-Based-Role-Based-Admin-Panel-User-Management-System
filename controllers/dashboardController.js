// @ts-nocheck
const userModel = require('../models/User')
const signupUser = require('../models/User')



async function getDashboard(req, res) {
    try {
        const users = await signupUser.findById(req.auth._id)
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader("Surrogate-Control", "no-store");



        if (!users) return res.render('auth/login', { success: null, error: 'No user found' })
            

        // TRY
        // const user = await signupUser.findOne({ email: req.body.email })
        // console.log('user =', user);
        return res.render('dashboard/dashboard', { user, success: null, error: null }) 

    } catch (error) {
        console.error('Error from getDashboard', error.meessage, error.stack)
        res.render('auth/login', { success: null, error: 'Failed to load Dashboard' })

    }
}

module.exports = {
    getDashboard
}