const user = require('express').Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/auth')

//public
user.post('/register', userController.register)
user.post('/login', userController.login)

//private
user.get('/currentUser', authMiddleware, userController.getCurrentUser)

module.exports = user
