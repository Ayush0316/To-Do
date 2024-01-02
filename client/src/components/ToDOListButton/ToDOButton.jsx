import React from 'react';
import './TodoListButton.css';

const TodoListButton = ({ list, onSelectList }) => {
  const handleClick = () => {
    onSelectList(list.id);
  };

  return (
    <button className="todo-list-btn" onClick={handleClick}>
      {list.title}
    </button>
  );
};

export default TodoListButton;
