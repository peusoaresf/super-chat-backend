const express = require('express')
const jwt = require('jsonwebtoken')
const { userSignup, userSignin } = require('../services/authService')

const router = express.Router()

const generateJwt = (props) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user: props }, process.env.SECRET, {
      expiresIn: '9999 years'
    }, (err, token) => {
      if (err) {
        return reject(err)
      }

      resolve(token)
    })
  })
}

router.post('/signup', async (req, res, next) => {
  try {
    await userSignup(req.body.username, req.body.password)

    const { password, ...otherProps } = await userSignin(req.body.username, req.body.password)

    const token = await generateJwt(otherProps)

    res.json({
      auth: true,
      token
    })
  } catch (e) {
    next(e)
  }
})

router.post('/signin', async (req, res, next) => {
  try {
    const { password, ...otherProps } = await userSignin(req.body.username, req.body.password)

    const token = await generateJwt(otherProps)

    res.json({
      auth: true,
      token
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