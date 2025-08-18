const registerUser = require('../models/User')
const bcrypt = require('bcrypt')
const saltRound = 10

const jwt = require('jsonwebtoken')

require('dotenv').config()

async function postRegisterUser(req, res) {
    const { username, email, password, confirmPassword } = req.body
    console.log(req.body);

    if (password !== confirmPassword) {
        return res.render('auth/register', { error: 'Password do not match' })
    }


    try {
        //   NEED TO CHECK EXISTING USER HERE


        const hashedPassword = await bcrypt.hash(password, saltRound)
        console.log(hashedPassword);


        await registerUser.create({
            user_name: username,
            email: email,
            password: hashedPassword,

        })
        res.redirect('/login?Success=Account Created Succesfully')
    } catch (error) {
        console.log(error);
        res.redirect('auth/register', { error: 'Signup failed, Please try again' })

    }
}

async function postLoginUser(req, res) {
    const { username, password } = req.body
    console.log(req.body);

    try {
        const signupUser = await registerUser.findOne({ username })
        if (!signupUser || signupUser.password !== password) {
            return res.render('auth/login', {
                error: 'Invalid Username or Password',
                success: null
            })
        }

        res.redirect('/users')
    } catch (error) {
        console.err(error),
            res.status(500).send('Server error')

    }
}


module.exports = {
    postRegisterUser,
    postLoginUser,
}