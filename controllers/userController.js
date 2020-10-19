const express = require('express')
const { addUserFriendByUsername } = require('../services/userService')

const router = express.Router()

router.get('/user/details', (req, res) => {
    res.json({
        result: req.user
    })
})

router.post('/user/addFriend', async (req, res, next) => {
    try {
        await addUserFriendByUsername(req.user.id, req.body.friendUsername)

        res.json({
            result: 'success'
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router