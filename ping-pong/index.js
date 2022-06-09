const express = require('express')
const app = express()

const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const { Pong } = require('./models')

app.get('/', async (req, res) => {
  const [pong] = await Pong.findOrCreate({ where: {} })
  pong.ping++
  const savedPong = await pong.save()
  res.send(`Pong: ${savedPong.ping}`)
})

app.get('/count', async (req, res) => {
  const [pong] = await Pong.findOrCreate({ where: {} })
  res.json(pong.ping)
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()