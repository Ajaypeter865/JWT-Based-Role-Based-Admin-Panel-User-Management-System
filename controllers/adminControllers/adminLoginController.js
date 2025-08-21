const { error } = require('console')
const adminModel = require('../../models/admin')
const userModel = require('../../models/User')

const jwt = require('jsonwebtoken')
require('dotenv').config()

async function postAdmin(req, res) {
    const { email, password } = req.body
    if (!email || !password) res.status(401).render('admin', { success: null, error: 'Invalid Email or Password' })

    try {
        const loginAdmin = await adminModel.findOne({ email })


        if (!loginAdmin || password !== loginAdmin.password)
            return res.render('admin/adminLogin', { success: null, error: 'Invalid Email or Password' })

        const token = jwt.sign(
            { id: loginAdmin._id, email: loginAdmin.email, password: loginAdmin.password, role : 'admin' }
            , process.env.secretKey,
            { expiresIn: '1d' })




        res.cookie('adminToken', token, { httpOnly: true })
        const signupUser = await userModel.find({})




        res.render('admin/users', { users: signupUser, success: 'Login successfull', error: null })



    } catch (error) {
        console.error(error)
        res.status(500).render('admin', { error: 'Server error', success: null })

    }
}

module.exports = {
    postAdmin
}
