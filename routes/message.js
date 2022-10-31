const message = require('express').Router()
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middleware/auth')

message.post('/all-message', authMiddleware, messageController.getAllMessage)
message.post('/send-msg', authMiddleware, messageController.newMessage)

module.exports = message
