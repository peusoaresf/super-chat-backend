require("dotenv-safe").config();

const express = require('express')
const api = require('./controllers')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
const port = 3000

app.use(express.json())

api(app)
errorMiddleware(app)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})