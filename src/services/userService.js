const { getChatIdForNewFriends } = require('./chatService')
const { ValidationError, UsernameNotFoundError } = require('../errors')
const { updateUser, findUserById, findUserByUsername } = require('../repositories/userRepository')

const addUserFriendByUsername = async (userId, friendUsername) => {
  if (!friendUsername) {
    throw new ValidationError('Friend username is required')
  }

  const user = await findUserById(userId)
  const friend = await findUserByUsername(friendUsername)

  if (!friend) {
    throw new UsernameNotFoundError()
  }

  user.friends.push(friend.id)

  const chatId = await getChatIdForNewFriends([user.id, friend.id])

  user.chats.push(chatId)

  await updateUser(user)
}

module.exports = {
  addUserFriendByUsername
}