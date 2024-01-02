import React, { useEffect, useState } from 'react';
import TodoListButton from '../ToDOListButton/ToDOButton';
import './LeftSideDrawer.css';
import axios from 'axios';

const LeftSideDrawer = ({ lists, onSelectList, addList }) => {
  const [todoLists, setTodoLists] = useState([]);
  const [newListVisible, setNewListVisible] = useState(false);
  const [newListName, setNewListName] = useState('');

  // getting list data from the database.
  useEffect(() => {
    const fetchData = async () => {
      console.log("rerendering my self agian")
      try {
        const storedToken = await localStorage.getItem('token'); // Assuming you store the selectedListId in localStorage
  
        if (storedToken) {
          const result = await axios.post(
            'http://localhost:8000/api/user/getListData',
            {listsIds: lists},
            {
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
  
          console.log(result.data.data);
          setTodoLists(result.data.data);
        } else {
          console.log('Token not found in localStorage');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [lists]);

  const handleCreateList = () => {
    setNewListVisible(true);
  };

  const handleCreateListSubmit = async (e) => {
    e.preventDefault();
    addList(newListName);
    setNewListVisible(false);
    setNewListName('');
  };

  return (
    <div className="left-side-drawer">
      <button className="create-list-btn" onClick={handleCreateList}>
        Create a new TO-DO list
      </button>

      {newListVisible && (
        <div>
          <input
            type="text"
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button onClick={handleCreateListSubmit}>Submit</button>
        </div>
      )}

      {todoLists.map((list) => (
        <TodoListButton key={list.id} list={list} onSelectList={onSelectList} />
      ))}
    </div>
  );
};

export default LeftSideDrawer;
