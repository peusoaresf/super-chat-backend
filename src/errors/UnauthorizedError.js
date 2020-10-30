module.exports = class UnauthorizedError extends Error {
  constructor() {
    super()

    this.name = 'UnauthorizedError'
    this.status = 401
    this.message = 'No token provided'
  }
}