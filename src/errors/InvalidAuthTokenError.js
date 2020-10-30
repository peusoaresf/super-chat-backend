module.exports = class InvalidAuthTokenError extends Error {
  constructor() {
    super()

    this.name = 'InvalidAuthTokenError'
    this.status = 500
    this.message = 'Failed to authenticate token'
  }
}