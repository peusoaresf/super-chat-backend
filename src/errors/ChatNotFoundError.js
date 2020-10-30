module.exports = class ChatNotFoundError extends Error {
  constructor() {
    super()

    this.name = 'ChatNotFoundError'
    this.status = 404
    this.message = 'Chat is not found'
  }
}