require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const client = require('./helpers/mongoConfig')

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

app.listen(PORT, () => console.log(`Server Online, running at port ${PORT}`))
