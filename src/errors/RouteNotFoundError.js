module.exports = class RouteNotFoundError extends Error {
  constructor() {
    super()

    this.name = 'RouteNotFoundError'
    this.status = 404
    this.message = 'Route not found'
  }
}