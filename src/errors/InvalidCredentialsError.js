module.exports = class InvalidCredentialsError extends Error {
  constructor() {
    super()

    this.name = 'InvalidCredentialsError'
    this.status = 500
    this.message = 'Incorrect username or password'
  }
}