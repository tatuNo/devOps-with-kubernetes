const todosRouter = require('express').Router()
const { Todo } = require('../models')

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.findAll({})
  res.json(todos)
})

todosRouter.post('/', async (req, res) => {
  const todo = await Todo.create(req.body)
  res.json(todo)
})

module.exports = todosRouter