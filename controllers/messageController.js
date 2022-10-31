const response = require("../helpers/response")
const { messageModel } = require("../models/messageModel")

exports.newMessage = async (req, res) => {
  const {id} = req.authUser
  try {
    const {sender, recipient, message} = req.body
    if(id===sender) {
      const msg = await messageModel.create({
        message: {text: message},
        sender: sender,
        users: [sender, recipient]
      })
      if(msg) {
        return response(res, 'Success to send message')
      } else {
        return response(res, 'Failed to send message', null, null, 400)
      }
    } else {
      return response(res, 'Failed to send message. User recognation', null, null, 400)
    }
  } catch (error) {
    return response(res, 'Any problem when send message', null, null, 400)
  }
}
exports.getAllMessage = async (req, res) => {
  const {id} = req.authUser
  try {
    const {sender, recipient} = req.body
    if(id === sender){
      const msg = await messageModel.find({
        users: {
          $all: [sender, recipient]
        }
      }).sort({updatedAt: 1})
      const mappingMsg = msg.map(el => {
        return {
          fromSelf: el.sender.toString() === sender,
          message: el.message.text
        }
      })
      return response(res, 'success getting all message', mappingMsg)
    } else {
      return response(res, 'Any problem when getting chat message. User recognation', null, null, 400)
    }
  } catch (error) {
    return response(res, 'Any problem when send message', null, null, 400)
  }
}
