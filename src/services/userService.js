const {
  updateUser,
  findUserById,
  findUserByUsername
} = require('../repositories/userRepository')

const { getChatIdForNewFriends } = require('./chatService')

const addUserFriendByUsername = async (userId, friendUsername) => {
  if (!friendUsername) {
    throw new Error('Friend username is required')
  }

  const user = await findUserById(userId)
  const friend = await findUserByUsername(friendUsername)

  if (!friend) {
    throw new Error('Friend username is not found')
  }

  user.friends.push(friend.id)

  const chatId = await getChatIdForNewFriends([user.id, friend.id])

  user.chats.push(chatId)

  await updateUser(user)
}

module.exports = {
  addUserFriendByUsername
}