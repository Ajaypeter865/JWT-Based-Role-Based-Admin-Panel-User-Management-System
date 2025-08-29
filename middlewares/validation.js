const express = require('express')
const { body, validationResult } = require('express-validator')
const userModel = require('../models/User')

const registervalidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('username').notEmpty().isLength({ min: 3 }),

    async (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            console.log('Register validator hits');
            return res.status(400).render('auth/register', { success: null, error: null })

        }

        next()
    }

]

const adminValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),

    (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            req.validationErrors = error.array()
            console.log('error in validaton', req.validationErrors);

        }

        next()
    }

]

module.exports = { registervalidator, adminValidator }