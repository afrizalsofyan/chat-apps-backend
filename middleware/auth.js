const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

const authMiddleware = (req, res, next) => {
  if(req.headers.authorization){
    const authToken = req.headers.authorization
    const typeAuth = 'Bearer'
    if(authToken.includes(typeAuth)) {
      const token = authToken.slice(typeAuth.length + 1, authToken.length)
      try {
        const results = jwt.verify(token, process.env.APP_PRIVATE_KEY || 's3CREtKthreey')
        req.authUser = results
        next()
      } catch (error) {
        return response(res, 'Error, Token Invalid or Expired', null, null, 400)
      }
    }
  } else {
    console.log(req.headers.authorization)
    return response(res, 'Unauthorized', null, null, 401)
  }
}

module.exports = authMiddleware
