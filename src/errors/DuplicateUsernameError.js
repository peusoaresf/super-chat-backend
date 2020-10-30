module.exports = class DuplicateUsernameError extends Error {
  constructor() {
    super()

    this.name = 'DuplicateUsernameError'
    this.status = 500
    this.message = 'Username already in use'
  }
}