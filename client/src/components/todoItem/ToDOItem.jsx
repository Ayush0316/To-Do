import React, { useState } from 'react';
import './ToDoItem.css';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(todo.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset edited content to the original content when canceling edit
    setEditedContent(todo.content);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to handle the edited content submission
    // For now, we'll just log the edited content to the console
    console.log('Edited Content:', editedContent);
    onUpdate(editedContent, todo._id);
    // Disable editing mode after submitting
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input type="checkbox" />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleEditSubmit}>Submit</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.content}</span>
          <div className="actions">
            <span onClick={handleEditClick}>Edit</span>
            <span onClick={(e) => onDelete(e, todo._id)}>Delete</span>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
