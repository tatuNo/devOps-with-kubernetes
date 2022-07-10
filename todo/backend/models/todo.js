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
    validate: {
      len: {
        args: [1, 140],
      }
    }
  },
  done: {
    type: DataTypes.BOOLEAN,
    default: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'todo'
})

module.exports = Todo