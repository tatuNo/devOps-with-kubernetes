const Todo = require('./todo')

const syncTables = async () => {
  try {
    await Todo.sync()
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  Todo,
  syncTables
}