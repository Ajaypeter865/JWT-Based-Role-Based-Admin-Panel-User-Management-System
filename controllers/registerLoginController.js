const registerUser = require('../models/User')

async function postRegisterUser(req, res) {
    const { username, email, password,} = req.body
    console.log(req.body);
    
    try {
        registerUser.create({
            user_name : username,
            email : email,
            password : password,
        })
        res.redirect('/login')
    } catch (error) {
        console.log(error);
        res.statu(500).send('Signup Failed')
        
    }
    
    
}

module.exports = {
    postRegisterUser,
}