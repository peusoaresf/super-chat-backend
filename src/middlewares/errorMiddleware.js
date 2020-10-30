const RouteNotFoundError = require('../errors/RouteNotFoundError')

const routeNotFoundHandler = (req, res, next) => {
  next(new RouteNotFoundError())
}

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500

  res.status(status).json({
    name: err.name || 'UnknownError',
    status: status,
    message: err.message
  })
}

module.exports = (server) => {
  server.use(routeNotFoundHandler)
  server.use(errorHandler)
}