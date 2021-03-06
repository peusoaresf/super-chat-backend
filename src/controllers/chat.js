const express = require('express');
const ChatClient = require('../facades/ChatClient')
const { verifyJWT, verifyJWTQueryString } = require('../middlewares/authMiddleware')
const { connectChatClient, disconnectChatClient, sendChatMessage } = require('../services/chatService')

const router = express.Router();

router.get('/subscribe', verifyJWTQueryString, async (req, res, next) => {
  try {
    var client = new ChatClient(req.user.id, res)

    client.onClose(async () => {
      await disconnectChatClient(client.id)
    })

    await connectChatClient(client)
  } catch (e) {
    next(e)
  }
})

router.post('/sendMessage', verifyJWT, async (req, res, next) => {
  try {
    await sendChatMessage(req.body.chatId, req.body.text)

    res.json({
      result: 'success'
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router