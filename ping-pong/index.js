const express = require('express')
const app = express()

const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const { Pong, syncTables } = require('./models')

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

app.get('/healthz', async (req, res) => {
  const ready = await start()
  ready ? res.status(200).end() : res.status(500).end()
})

const start = async () => {
  const connected = await connectToDatabase()
  await syncTables()
  return connected
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

start()