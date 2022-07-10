import { useState, useEffect } from 'react'
import axios from './util/apiClient'
import Form from './components/Form'
import Todo from './components/Todo'

const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const { data } = await axios.get('/todos')
    setTodos(data)
  }

  const createTodo = async (text) => {
    const { data } = await axios.post('/todos', text)
    setTodos(todos.concat(data))
  }

  const completeTodo = async (todo) => {
    const { data } = await axios.put(`/todos/${todo.id}`, {
      done: true
    })
    setTodos(todos.map(todo => todo.id === data.id ? data : todo))
  }

  return (
    <div>
      <img src={`/api/dailyimage.jpg`} alt="" />
      <Form createTodo={createTodo} />
      {todos.map(todo => (
        <Todo todo={todo} completeTodo={completeTodo} />
      ))}
    </div>
  )
}

export default App
