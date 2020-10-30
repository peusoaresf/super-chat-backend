const jwt = require('jsonwebtoken')
const { UnauthorizedError, InvalidAuthTokenError } = require('../errors')

const verify = (req, res, next, token) => {
  if (!token) {
    return next(new UnauthorizedError())
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next(new InvalidAuthTokenError())
    }

    req.user = decoded.user

    next()
  })
}

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']

  verify(req, res, next, token)
}

const verifyJWTQueryString = (req, res, next) => {
  const token = req.query['x-access-token']

  verify(req, res, next, token)
}

module.exports = {
  verifyJWT,
  verifyJWTQueryString
}