import React, { useState, useCallback } from 'react';
import Todos from './components/Todos';
import './App.css'; 

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(['Todo 1', 'Todo 2']);
  
  console.log("Parent Component Rendered");

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback((todo) => {
    setTodos((t) => [...t, todo]);
  }, []);

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="app-container">
        <div className="counter-section">
          <h2 className='text-2xl font-bold text-center'>Parent Counter</h2>
          <p className='mt-4'>Count: {count}</p>
          <button onClick={increment} className='mt-5'>Increment Count +</button>
          <p className="note">Clicking this button will NOT re-render the child component below. you can check console for more details.</p>
        </div>
        <hr />
        <Todos todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} />
      </div>
      <div className='text-center mt-5'>
          Made by <span className='text-[#61dafb]'>Harsh</span>
      </div>
    </>
  );
};

export default App;