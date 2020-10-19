const express = require('express')
const jwt = require('jsonwebtoken')
const { findUserByUsername } = require('../repositories/userRepository')
const { userSignup, userSignin  } = require('../services/userService')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
    try {        
        await userSignup(req.body.username, req.body.password)

        res.redirect(307, '/auth/signin')
    } catch (e) {
        next(e)
    }
})

router.post('/signin', async (req, res, next) => {
    try {
        await userSignin(req.body.username, req.body.password)

        const { password, ...otherProps } = await findUserByUsername(req.body.username)

        jwt.sign({ user: otherProps }, process.env.SECRET, {
            expiresIn: 300
        }, (err, token) => {
            if (err) {
                return next(err)
            }

            res.json({
                auth: true, 
                token
            })
        })
    } catch (e) {
        next(e)
    }
})

router.post('/signout', (req, res) => {
    res.json({
        auth: false,
        token: null
    })
})

module.exports = router