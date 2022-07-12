const todosRouter = require('express').Router()
const { Todo } = require('../models')
const { sendMessage } = require('../util/nats')

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.findAll({})
  res.json(todos)
})

todosRouter.post('/', async (req, res) => {
  const todo = await Todo.create(req.body)
  sendMessage(todo)
  res.json(todo)
})

todosRouter.put('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id)
  todo.done = req.body.done

  const updatedTodo = await todo.save()

  sendMessage(updatedTodo)
  res.json(updatedTodo)
})

module.exports = todosRouter