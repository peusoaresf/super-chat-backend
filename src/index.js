require("dotenv-safe").config();

const express = require('express')
const api = require('./controllers')

const app = express()
const port = 3000

app.use(express.json())

api(app)

app.use((err, req, res, next) => {
  const status = err.status || 500

  res.status(status).json({
    name: err.name || 'UnknownError',
    status: status,
    message: err.message
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})