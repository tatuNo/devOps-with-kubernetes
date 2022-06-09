const express = require("express")
const cors = require("cors")

const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')

const todosRouter = require('./controllers/todos')
const dailyImageRouter = require('./controllers/dailyimage')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/todos', todosRouter)
app.use('/dailyimage.jpg', dailyImageRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()