const { 
    updateUser, 
    findUserById, 
    findUserByUsername,
    createUser, 
    findUserByUsernameAndPassword
 } = require('../repositories/userRepository')

const { getChatIdForNewFriends } = require('./chatService')

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
    if (!(await findUserByUsernameAndPassword(username, password))) {
        throw new Error('incorrect username or password')
    }
}

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

    updateUser(user)
}

module.exports = {
    userSignup,
    userSignin,
    addUserFriendByUsername
}