const chats = {}

const createChat = async (users) => {
    const id = (new Date()).getTime()

    chats[id] = {
        id,
        subscribers: users
    }

    return id
}

const findAllChats = async () => {
    return Object.keys(chats).map(id => chats[id])
}

const findChatById = async (chatId) => {
    return chats[chatId]
}

const findChatBySubscribers = async (subscribers) => {
    for (let id in chats) {
        const chat = chats[id]

        const chatSubs = chat.subscribers.concat([])
        const newSubs = subscribers.concat([])
        chatSubs.sort()
        newSubs.sort()

        if (JSON.stringify(chatSubs) === JSON.stringify(newSubs)) {
            return chat
        }
    }
    return undefined
}

module.exports = {
    createChat,
    findAllChats,
    findChatById,
    findChatBySubscribers
}