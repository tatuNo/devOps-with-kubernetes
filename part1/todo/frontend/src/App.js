import { useState } from 'react';

const todos = [
  'TODO1', 
  'TODO2',
  'TODO3'
];

const App = () => {
  const [todo, setTodo] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handle submit');
  }
  return(
    <div>
      <img src='http://localhost:8081/api' alt="" />
      <form onSubmit={handleSubmit}>
        <input type="text" maxLength="140" value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <input type="submit" value="Create TODO" />
      </form>
      <ul>
        {todos.map(todo =>
          <li key={todo}>
            {todo}
          </li> 
        )}
      </ul>
    </div>
  );
};

export default App;
