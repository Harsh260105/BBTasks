import React, { useState } from "react";

const Todos = ({ todos, addTodo, deleteTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  console.log("Child Component (Todos) Rendered");

  return (
    <div className="todos-section flex flex-col items-center justify-center">
      <h2 className="mb-10 text-center text-2xl font-bold">My Todos (Child)</h2>
      {todos.map((todo, index) => {
        return (
          <p
            key={index}
            className="mb-5 p-3 w-lg border-2 border-gray-300 rounded-2xl flex justify-between"
          >
            {todo} <button onClick={() => deleteTodo(index)}>Delete</button>
          </p>
        );
      })}

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
        onKeyUp={(e) => {
          e.preventDefault();
          if (newTodo === "") return;
          console.log(e.key);
          if (e.key === "Enter") {
            addTodo(newTodo);
            setNewTodo("");
          }
        }}
        className="mt-5 p-3 min-w-mb border-2 border-gray-300 rounded-2xl"
      />
      <button
        onClick={() => {
          if (newTodo === "") return;
          addTodo(newTodo);
          setNewTodo("");
        }}
        className="mt-5"
      >
        Add Todo
      </button>
    </div>
  );
};

export default React.memo(Todos);
