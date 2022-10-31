const mongoose = require('mongoose')
const { messageSchema } = require('../helpers/schemaModel')

exports.messageModel = mongoose.model('message', messageSchema)
