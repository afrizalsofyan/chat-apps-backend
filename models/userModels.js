const mongoose = require('mongoose')
const { userSchema } = require('../helpers/schemaModel')

exports.userModel = mongoose.model('User', userSchema)
