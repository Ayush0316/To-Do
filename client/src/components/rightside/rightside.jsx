import React, { useState } from 'react';
import TodoItem from '../todoItem/ToDOItem';
import './RightSide.css';

const RightSide = ({ selectedList }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy milk', completed: false },
    { id: 2, text: 'Finish project', completed: true },
    // Add more todos as needed
  ]);

  return (
    <div className="right-side">
      <div className="new-todo">
        <input type="text" placeholder="Add a new todo" />
        <button>Add</button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default RightSide;
