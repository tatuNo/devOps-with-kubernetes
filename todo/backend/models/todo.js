const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Todo extends Model {}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'todo'
})

module.exports = Todo