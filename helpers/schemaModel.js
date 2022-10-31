const mongoose = require('mongoose')

exports.userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 5,
    max: 20,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 20,
    unique: true,
    required: true,
  },
  isPictureSet: {
    type: Boolean,
    default: false
  },
  userPicture: {
    type: String,
    default: ''
  }
})

exports.messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)
