const express = require("express")
const cors = require("cors")
require('express-async-errors')

const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const { requestLogger, errorHandler } = require('./util/middleware')
const { syncTables } = require('./models')

const todosRouter = require('./controllers/todos')
const dailyImageRouter = require('./controllers/dailyimage')

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/', (req,res) => {
  res.status(200).send()
})

app.get('/healthz', async (req, res) => {
  const ready = await start()
  ready ? res.status(200).end() : res.status(500).end()
})

app.use('/api/todos', todosRouter)
app.use('/api/dailyimage.jpg', dailyImageRouter)

app.use(errorHandler)

const start = async () => {
  const connected = await connectToDatabase()
  await syncTables()
  return connected
}

app.listen(PORT, () => {
  start()
  console.log(`Server running on port ${PORT}`)
})