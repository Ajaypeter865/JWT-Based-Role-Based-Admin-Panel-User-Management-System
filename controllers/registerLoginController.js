const registerUser = require('../models/User')

const bcrypt = require('bcrypt')
const { error } = require('console')
const saltRound = 10

const jwt = require('jsonwebtoken')

require('dotenv').config()

async function postRegisterUser(req, res) {
    const { username, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        return res.render('auth/register', { error: 'Password do not match', success: null })
    }

    try {
        //   NEED TO CHECK EXISTING USER HERE
        const existingUser = await registerUser.findOne({ email })
        if (existingUser) {
            return res.render('auth/register', { success: null, error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, saltRound)

        await registerUser.create({
            user_name: username,
            email: email,
            password: hashedPassword,

        })
        return res.redirect('/login?Success=Account Created Succesfully')

    } catch (error) {
        console.error('Error is post register user = ', error.message, error.stack)

        return res.status(403).redirect('auth/register', { error: 'Signup failed, Please try again', success: null })

    }
}

async function postLoginUser(req, res) {
    const { email, password } = req.body

    try {
        const signupUser = await registerUser.findOne({ email })
        if (!signupUser) return res.render('auth/login', { error: 'User do not exist', success: null })

        const isMatch = await bcrypt.compare(password, signupUser.password)
        if (!isMatch) return res.render('auth/login', { error: 'Password do not match', success: null })

        const token = jwt.sign(
            { id: signupUser._id, email: signupUser.email, role: 'user', user_name: signupUser.user_name },
            process.env.secretKey,
            { expiresIn: '1d' })

        res.cookie('userToken', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

        res.render('dashboard/dashboard', { user: signupUser, success: null, error: null })

    } catch (error) {
        console.error('Error is postloginuser = ', error.message, error.stack)
        res.status(500).send('Server error')

    }
}

module.exports = {
    postRegisterUser,
    postLoginUser,
}