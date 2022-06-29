const express = require("express")
const cors = require("cors")
require('express-async-errors')

const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const { requestLogger, errorHandler } = require('./util/middleware')

const todosRouter = require('./controllers/todos')
const dailyImageRouter = require('./controllers/dailyimage')

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/', (req,res) => {
  res.status(200).send()
})

app.use('/api/todos', todosRouter)
app.use('/api/dailyimage.jpg', dailyImageRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()