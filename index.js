require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const client = require('./helpers/mongoConfig')
const socket = require('socket.io')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors({
  origin: process.env.ORIGIN_URL,
}))

app.use('/api', require('./routes/index'))

app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Hi, server online'
  })
})

client()

const indexServer = app.listen(PORT, () => console.log(`Server Online, running at port ${PORT}`))

const io = socket(indexServer, {
  cors: {
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }
})

global.onlineUser = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket
  socket.on('add-user', (userId) => {
    onlineUser.set(userId, socket.id)
  })

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUser.get(data.recipient)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message)
    }
  })
})
