const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Pong extends Model {}

Pong.init({
  ping: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'pong'
})

module.exports = Pong