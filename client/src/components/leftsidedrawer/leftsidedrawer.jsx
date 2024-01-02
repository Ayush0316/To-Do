import React, { useEffect, useState } from 'react';
import TodoListButton from '../ToDOListButton/ToDOButton';
import './LeftSideDrawer.css';

const LeftSideDrawer = ({ lists, onSelectList }) => {
  const [todoLists, setTodoLists] = useState([
    { id: 1, title: 'Home Tasks' },
    { id: 2, title: 'Work Tasks'},
    // Add more todo lists as needed
  ]);

  // getting list data from the database.
  useEffect(()=>{
    if(!lists){
      console.log("Lists needed")
    }
    console.log(lists)

  },[])

  return (
    <div className="left-side-drawer">
      <button className="create-list-btn">Create a new TO-DO list</button>
      {todoLists.map((list) => (
        <TodoListButton key={list.id} list={list} onSelectList={onSelectList} />
      ))}
    </div>
  );
};

export default LeftSideDrawer;
