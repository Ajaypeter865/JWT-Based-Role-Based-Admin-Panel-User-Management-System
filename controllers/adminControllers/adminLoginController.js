const { error } = require('console')
const adminModel = require('../../models/admin')
const userModel = require('../../models/User')

const jwt = require('jsonwebtoken')
require('dotenv').config()

async function postAdmin(req, res) {
    const { email, password } = req.body
    if (!email || !password) res.status(401).render('admin', { success: null, error: 'Invalid Email or Password' })
    // console.log(req.body);

    try {
        const loginAdmin = await adminModel.findOne({ email })
        // console.log('loginAdmin =',loginAdmin);
        // console.log(typeof loginAdmin);
        
        
        if (!loginAdmin || password !== loginAdmin.password )
            return res.render('admin/adminLogin', { success: null, error: 'Invalid Email or Password' })

        const token = jwt.sign(
            { id: loginAdmin._id, email: loginAdmin.email, password: loginAdmin.password }
            , process.env.secretKey,
            { expiresIn: '1d' })

        // console.log(token);


        res.cookie('adminToken', token, { httpOnly: true })
        const signupUser = await userModel.find({})
        console.log('signup user =',signupUser);
        

        
        res.render('admin/users', {users: signupUser, success: null, error: null })
        
        
        
    } catch (error) {
        console.error(error)
        res.status(500).render('admin', { error: 'Server error', success: null })

    }
}

module.exports = {
    postAdmin
}
