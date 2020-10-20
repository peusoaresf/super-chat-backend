const { createChat, findChatById, findChatBySubscribers } = require('../repositories/chatRepository')
const { createOfflineMessage, findOfflineMessagesByUserId, deleteOfflineMessagesByUserId } = require('../repositories/messageRepository')

const getChatIdForNewFriends = async (friends) => {
  const chat = await findChatBySubscribers(friends)

  let chatId

  if (!chat) {
    chatId = await createChat(friends)
  }

  return chatId || chat.id
}

const clients = {}

const connectChatClient = async (client) => {
  clients[client.id] = client

  console.log('Conecting client ' + client.id)

  const offlineMessages = await findOfflineMessagesByUserId(client.id)

  if (offlineMessages) {
    console.log('Sending queued messages to ' + client.id)
    client.sendMessages(offlineMessages)
    await deleteOfflineMessagesByUserId(client.id)
  }
}

const disconnectChatClient = async (clientId) => {
  delete clients[clientId]
}

const sendChatMessage = async (chatId, messageText) => {
  const chat = await findChatById(chatId)

  chat.subscribers.forEach(async subscriberId => {
    let client = clients[subscriberId]

    if (client) {
      console.log('Sending message to ' + subscriberId)
      client.sendMessage({
        chatId,
        text: messageText
      })
    }
    else {
      console.log('Enqueuing messages to ' + subscriberId)
      await createOfflineMessage(subscriberId, chatId, messageText)
    }
  })
}

module.exports = {
  getChatIdForNewFriends,
  connectChatClient,
  disconnectChatClient,
  sendChatMessage
}