const { connect, JSONCodec } = require('nats')

let nc

const jc = JSONCodec()

const getReady = async () => {
  nc = await connect({
    servers: process.env.NATS_URL
  })
}

const sendMessage = (todo) => {
  nc.publish('todo_data', jc.encode(JSON.stringify(todo)))
}

getReady()

module.exports = {
  sendMessage
}