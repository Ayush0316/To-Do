// TodoItem.js

import React from 'react';
import './ToDoItem.css';

const TodoItem = ({ todo }) => {
  return (
    <div className="todo-item">
      <input type="checkbox" />
      <span>{todo.text}</span>
      <div className="actions">
        <span>Edit</span>
        <span>Delete</span>
      </div>
    </div>
  );
};

export default TodoItem;
