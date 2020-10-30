const { findUserByUsername, createUser } = require('../repositories/userRepository')
const { ValidationError, DuplicateUsernameError, InvalidCredentialsError } = require('../errors')

const userSignup = async (username, password) => {
  if (!username || !password) {
    throw new ValidationError('Username and password are required')
  }

  if (await findUserByUsername(username)) {
    throw new DuplicateUsernameError()
  }

  await createUser(username, password)
}

const userSignin = async (username, password) => {
  if (!username || !password) {
    throw new ValidationError('Username and password are required')
  }

  const user = await findUserByUsername(username)

  if (!user || !hasCorrectPassword(user, password)) {
    throw new InvalidCredentialsError()
  }

  return user
}

const hasCorrectPassword = (user, password) => {
  return user.password === password
}

module.exports = {
  userSignup,
  userSignin
}