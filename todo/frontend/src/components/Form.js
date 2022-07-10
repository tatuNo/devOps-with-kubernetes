import { useState } from 'react'

const Form = ({ createTodo }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createTodo({ text })
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" maxLength="140" value={text} onChange={(e) => setText(e.target.value)}/>
      <input type="submit" value="Create TODO" />
    </form>
  )
}

export default Form
