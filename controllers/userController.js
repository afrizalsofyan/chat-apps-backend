const User = require('../models/userModels')
const bcrypt = require('bcrypt');
const response = require('../helpers/response');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const {username, email, password} = req.body;
  try {
    const validationUsername = await User.userModel.findOne({username})
    if(validationUsername){
      return response(res, 'Username already taken by other users.', null, null, 400)
    }
    const validationEmail = await User.userModel.findOne({email})
    if(validationEmail){
      return response(res, 'Email already taken by other users.', null, null, 400)
    }
    const hashingPassword = await bcrypt.hash(password, 10)
    const user = await User.userModel.create({
      username,
      email,
      password: hashingPassword
    })
    return response(res, 'Register success', user)
  } catch (error) {
    return response(res, error.message)
  }
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const userData = await User.userModel.findOne({email})
    if(userData){
      const checkPassword = await bcrypt.compare(password, userData.password)
      if(checkPassword){
        const token = jwt.sign({id: userData._id, email: userData.email}, process.env.APP_PRIVATE_KEY || 's3CREtKthreey')
        console.log(token)
        return response(res, 'Login success', {token})
      }
    } else {
      return response(res, 'Email or password wrong.', null, null, 400)
    }
  } catch (error) {
    return response(res, error.message)
  }
}

exports.getCurrentUser = async (req, res) => {
  const {email} = req.authUser
  try {
    const user = await User.userModel.findOne({email})
    const dataUser = {email: user.email, username: user.username, picture: user.userPicture, pictureSet: user.isPictureSet}
    if(user) {
      return response(res, 'User found.', dataUser)
    } else {
      return response(res, 'User not found.', null, null, 400)
    }
  } catch (error) {
    return response(res, error.message, null, null, 400)
  }
}
