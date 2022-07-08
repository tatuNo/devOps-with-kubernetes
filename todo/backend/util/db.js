const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
    return true
  } catch (err) {
    console.log('connecting database failed')
    console.log(err)
    return false
  }
}

module.exports = {
  sequelize,
  connectToDatabase,
}