module.exports = class UsernameNotFoundError extends Error {
  constructor() {
    super()

    this.name = 'UsernameNotFoundError'
    this.status = 404
    this.message = 'Username is not found'
  }
}