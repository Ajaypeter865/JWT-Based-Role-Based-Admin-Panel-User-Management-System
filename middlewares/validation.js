const express = require('express')
const { body, validationResult } = require('express-validator')

const validator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('username').notEmpty().isLength({ min: 3 }),

    (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            if (req.originalUrl.includes('/admin')) {
                return res.render('admin/add-user', { success: null, error: null })
            } else {
                return res.status(400).render('auth/register', { success: null, error: null })

            }

        }

        next()
    }

]

module.exports = { validator }