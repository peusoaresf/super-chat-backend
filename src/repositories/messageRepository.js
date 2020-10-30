const offlineMessages = {}

const createOfflineMessage = async (userId, chatId, messageText) => {
    const messages = offlineMessages[userId] || []
    messages.push({
        chatId,
        text: messageText
    })
    offlineMessages[userId] = messages
}

const findOfflineMessagesByUserId = async (userId) => {
    return offlineMessages[userId]
}

const deleteOfflineMessagesByUserId = async (userId) => {
    delete offlineMessages[userId]
}

module.exports = {
    createOfflineMessage,
    findOfflineMessagesByUserId,
    deleteOfflineMessagesByUserId
}