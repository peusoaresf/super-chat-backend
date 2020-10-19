require("dotenv-safe").config();

const express = require('express')
const api = require('./controllers')

const app = express()
const port = 3000

app.use(express.json())
app.use(api)

app.use((err, req, res, next) => {  
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})