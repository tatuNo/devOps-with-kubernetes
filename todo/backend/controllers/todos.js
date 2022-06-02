const todosRouter = require('express').Router();

let todos = [
  'TODO1',
  'TODO2',
  'TODO3',
];

todosRouter.get('/', (req, res) => {
  res.json(todos);
});

todosRouter.post('/', (req, res) => {
  const body = req.body;
  console.log(body);

  const todo = body.text;
  todos = todos.concat(todo);

  console.log(todo);

  res.json(todo);
});

module.exports = todosRouter;