
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '25%'
  }
}

const Todo = ({ todo, completeTodo }) => {
  
  const handleOnClick = (todo) => {
    completeTodo(todo)
  }

  return (
    <div style={styles.container}>
      <span>{todo.text}</span>
      { todo.done ? <span>Done</span> : <span>Not Done</span>}
      <button onClick={() => handleOnClick(todo)}>Set As Done</button>
    </div>
  )
}

export default Todo