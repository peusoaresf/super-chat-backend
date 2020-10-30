const {
  findUserByUsername,
  createUser
} = require('../repositories/userRepository')

const userSignup = async (username, password) => {
  if (!username || !password) {
    throw new Error('Username and password are required')
  }
  if (await findUserByUsername(username)) {
    throw new Error('Username already in use')
  }
  await createUser(username, password)
}

const userSignin = async (username, password) => {
  if (!username || !password) {
    throw new Error('Username and password are required')
  }

  const user = await findUserByUsername(username)

  if (!user || !hasCorrectPassword(user, password)) {
    throw new Error('incorrect username or password')
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