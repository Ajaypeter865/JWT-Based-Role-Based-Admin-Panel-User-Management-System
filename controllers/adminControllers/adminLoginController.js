const { error } = require('console')
const adminSchema = require('../../models/admin')

const jwt = require('jsonwebtoken')
require('dotenv').config()

async function postAdmin(req, res) {
    const { email, password } = req.body
    if (!email || !password) res.status(401).render('admin/login', { success: null, error: 'Invalid Email or Password' })
    console.log(req.body);

    try {
        const loginAdmin = await adminSchema.findOne({ email })
        if (!loginAdmin || password !== loginAdmin.password)
            return res.render('admin/login', { success: null, error: 'Invalid Email or Password' })

        const token = jwt.sign(
            { id: loginAdmin._id, email: loginAdmin.email, password: loginAdmin.password }
            , process.env.secretKey,
            { expiresIn: '1d' })

        console.log(token);


        res.cookie('adminToken', token, { httpOnly: true })
        res.render('admin/users', { success: null, error: null })
    } catch (error) {
        console.error(error)
        res.status(500).render('admin/login', { error: 'Server error', success: null })

    }
}

module.exports = {
    postAdmin
}
