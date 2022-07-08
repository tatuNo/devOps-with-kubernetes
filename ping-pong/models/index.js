const Pong = require('./pong')

const syncTables = async () => {
  try {
    await Pong.sync()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  syncTables,
  Pong,
}