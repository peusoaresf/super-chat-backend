const ValidationError = require('./ValidationError')
const DuplicateUsernameError = require('./DuplicateUsernameError')
const InvalidCredentialsError = require('./InvalidCredentialsError')
const UsernameNotFoundError = require('./UsernameNotFoundError')
const ChatNotFoundError = require('./ChatNotFoundError')
const UnauthorizedError = require('./UnauthorizedError')
const InvalidAuthTokenError = require('./InvalidAuthTokenError')

module.exports = {
  ValidationError,
  DuplicateUsernameError,
  InvalidCredentialsError,
  UsernameNotFoundError,
  ChatNotFoundError,
  UnauthorizedError,
  InvalidAuthTokenError
}