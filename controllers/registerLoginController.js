const registerUser = require('../models/User')

async function postRegisterUser(req, res) {
    const { username, email, password, } = req.body
    console.log(req.body);
    try {
        await registerUser.create({
            user_name: username,
            email: email,
            password: password,
        })
        res.redirect('/login')
    } catch (error) {
        console.log(error);
        res.statu(500).send('Signup Failed')

    }
}

async function postLoginUser(req, res) {
    const { username, password } = req.body
    console.log(req.body);

    try {
        const signupUser = await registerUser.findOne({ username })
        if (!signupUser || signupUser.password !== password) {
            return res.render('auth/login', { error: 'Invalid Username or Password',
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