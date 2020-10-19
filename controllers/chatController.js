const express = require('express');
const ChatClient = require('../facades/ChatClient')
const { verifyJWT, verifyJWTQueryString } = require('../middlewares/authMiddleware')
const { connectClient, disconnectClient, sendMessage } = require('../services/chatService')

const router = express.Router();

router.get('/chat/subscribe', verifyJWTQueryString, async (req, res, next) => {
    try {
        var client = new ChatClient(req.user.id, res)

        client.onClose(() => {
            disconnectClient(client.id)
        })

        await connectClient(client)
    } catch (e) {
        next(e)
    }
})

router.post('/chat/sendMessage', verifyJWT, async (req, res, next) => {
    try {
        await sendMessage(req.body.chatId, req.body.text)

        res.json({
            result: 'success'
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router