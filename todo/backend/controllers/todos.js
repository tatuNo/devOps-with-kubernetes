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

todosRouter.put('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id)
  todo.done = req.body.done

  const updatedTodo = await todo.save()

  res.json(updatedTodo)
})

module.exports = todosRouter