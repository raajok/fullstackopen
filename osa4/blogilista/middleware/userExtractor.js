const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  req.user = user
  next()
}

module.exports = userExtractor