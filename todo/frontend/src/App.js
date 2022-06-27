import { useState, useEffect } from 'react'
import axios from './util/apiClient'

const App = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const { data } = await axios.get('/todos')
    setTodos(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data } = await axios.post('/todos', { text })
    
    setTodos(todos.concat(data))
    setText('')
  }

  return(
    <div>
      <img src={`/api/dailyimage.jpg`} alt="" />
      <form onSubmit={handleSubmit}>
        <input type="text" maxLength="140" value={text} onChange={(e) => setText(e.target.value)}/>
        <input type="submit" value="Create TODO" />
      </form>
      <ul>
        {todos.map(todo =>
          <li key={todo.id}>
            {todo.text}
          </li> 
        )}
      </ul>
    </div>
  )
}

export default App
