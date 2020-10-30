const express = require('express')
const { verifyJWT } = require('../middlewares/authMiddleware')
const { addUserFriendByUsername } = require('../services/userService')

const router = express.Router()

router.use(verifyJWT)

router.get('/details', (req, res) => {
  res.json(req.user)
})

router.post('/addFriend', async (req, res, next) => {
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