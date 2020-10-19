const users = {}

const createUser = async (username, password) => {
    let id = (new Date()).getTime()

    users[id] = {
        id,
        username,
        password,
        friends: [],
        chats: []
    }
}

const updateUser = async (user) => {
    users[user.id] = user
}

const findAllUsers = async () => {
    return Object.keys(users).map(id => users[id])
}

const findUserById = async (userId) => {
    for (let id in users) {
        if (Number(id) === Number(userId)) {
            return users[id]
        }
    }
    return undefined
}

const findUserByUsername = async (username) => {
    for (let id in users) {
        let user = users[id]
        if (user.username === username) {
            return user
        }
    }
    return undefined
}

const findUserByUsernameAndPassword = async (username, password) => {
    for (let id in users) {
        let user = users[id]
        if (user.username === username
                && user.password === password) {
            return user
        }
    }
    return undefined
}

module.exports = {
    createUser,
    updateUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByUsernameAndPassword
}