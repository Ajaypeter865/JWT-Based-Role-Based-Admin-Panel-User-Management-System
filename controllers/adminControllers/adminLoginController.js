const { error } = require('console')
const adminModel = require('../../models/admin')
const userModel = require('../../models/User')

const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const { urlencoded } = require('express')

async function postAdmin(req, res) {
    const { email, password } = req.body

    try {

        const loginAdmin = await adminModel.findOne({ email })
        if (!loginAdmin || password !== loginAdmin.password)
            return res.render('admin/adminLogin', { success: null, error: 'Invalid Email or Password' })


        const token = jwt.sign(
            { id: loginAdmin._id, email: loginAdmin.email, password: loginAdmin.password, role: 'admin' }
            , process.env.secretKey,
            { expiresIn: '1d' })

        res.cookie('adminToken', token, { httpOnly: true })

        const signupUser = await userModel.find({}).sort({ createdAt: -1 })

        res.render('admin/users', { users: signupUser, success: 'Login successfull', error: null })
    } catch (error) {
        console.error(error)

        res.status(500).render('admin', { error: 'Server error', success: null })

    }
}

const addUser = async (req, res) => {
    const { email, password } = req.body
    try {

        const existingUser = await userModel.findOne({ email })
        
        if (existingUser) {
            const users = await userModel.find().sort({ createdAt: -1 })
            return res.render('admin/users', {users, success: null, error: 'User already exits' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const userName = email.split('@')[0]
        await userModel.insertOne({ email, password: hashedPassword, user_name: userName })



        const users = await userModel.find().sort({ createdAt: -1 })
        return res.render('admin/users', { users, success: "User added successfully", error: null })

    } catch (error) {
        console.error('Error in addUser =', error.message, error.stack);

    }
}

const updateUser = async (req, res) => {
    const { id, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        await userModel.findByIdAndUpdate(id,
            { email, password: hashedPassword })

        const users = await userModel.find().sort({ createdAt: -1 })
        res.render('admin/users', { users, success: "User updated successfully", error: null })

    } catch (error) {
        console.error('Error from update user = ', error.message, error.stack)
        res.status(500).render('admin/users',
            {
                users: [],
                success: null,
                error: 'Something went wrong '
            }
        )
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.body
    try {
        await userModel.findByIdAndDelete(id)

        const users = await userModel.find().sort({ createdAt: -1 })
        return res.render('admin/users', { users, success: "User Deleted successfully", error: null })
    } catch (error) {
        console.error('Error from delete user =', error.message, error.stack);

    }


}


const blockUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (!user) {
            return res.status(403).render('admin/users', { success: null, error: 'No user found' })
        }

        user.isBlock = !user.isBlock
        await user?.save()


        const users = await userModel.find().sort({ createdAt: -1 })
        return res.render('admin/users', { users, success: 'User block status updated', error: null })


    } catch (error) {
        console.error('Error from block user = ', error.message, error.stack);
        res.status(500).render('admin/users',
            {
                users: [],
                success: null,
                error: 'Something went wrong'
            }
        )
    }
}



// const sortDashboard = async (req, res) => {
//     try {
//         const users = await userModel.find().sort({ createdAt: -1 })
//         res.render('admin/users', { users, error: null, success: null })
//         console.log("SortDashboard = ", users);


//     } catch (error) {
//         console.error(error);

//     }
// }

module.exports = {
    postAdmin,
    updateUser,
    addUser,
    deleteUser,
    blockUser
}
