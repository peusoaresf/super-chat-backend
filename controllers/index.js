const express = require('express')
const { verifyJWT } = require('../middlewares/authMiddleware')

const authController = require('./authController')
const userController = require('./userController')
const chatController = require('./chatController')

const router = express.Router()

router.use('/auth', authController)
router.use('/api', chatController)
router.use('/api', verifyJWT, userController)

module.exports = router