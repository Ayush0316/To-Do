import React, { useEffect, useState } from 'react';
import TodoItem from '../todoItem/ToDOItem';
import './RightSide.css';
import axios from "axios";
        
const RightSide = ({ selectedList }) => {
  console.log(selectedList)
  const [todos, setTodos] = useState([]);
  const [newadded, setnew] = useState(true);

  // Get all the ToDO in the list.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await localStorage.getItem('token'); // Assuming you store the selectedListId in localStorage
  
        if (storedToken) {
          const result = await axios.post(
            'http://localhost:8000/api/user/items',
            {listId: selectedList},
            {
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
  
          console.log(result.data.items);
          setTodos(result.data.items);
        } else {
          console.log('Token or listId not found in localStorage');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setnew(false)
    };
  
    fetchData();
  }, [newadded]); // Empty dependency array to run the effect only once
  

  // Add a new TODO item in the list.
  const [newTodo, setNewTodo] = useState("")

  const onSubmit = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/user/additem', 
    {content: newTodo,
    listId: selectedList},
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    }).then(res=>{
        console.log(res);
        setnew(true)
        setNewTodo("");}
    ).catch(err=>{
        console.log(err)
    });
  }

  // delete TODO
  const deleteTodo = async (e,itemID) => {
    e.preventDefault()
    if(!itemID){
      console.log("provide itemId and list id");
    }
    axios.post('http://localhost:8000/api/user/deleteitem', 
    {itemID: itemID,
    listID: selectedList},
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    }).then(res=>{
        console.log(res);
        setnew(true)
    }
    ).catch(err=>{
        console.log(err)
    });
  }

  // Update TODO
  const updateTodo = async(content, itemID) =>{
    if(!content, !itemID){
      console.log("Please provide the content and item id")
    }
    axios.post('http://localhost:8000/api/user/changecontent', 
    {itemID: itemID,
    content: content},
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    }).then(res=>{
        console.log(res);
        setnew(true)
    }
    ).catch(err=>{
        console.log(err)
    });
  }

  // Mark todo
  const markTodo = async(itemID)=>{
    if(!itemID){
      console.log("itemID needed");
    }
    axios.post('http://localhost:8000/api/user/markitem', 
    {itemID: itemID},
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    }).then(res=>{
        console.log(res);
        setnew(true)
    }
    ).catch(err=>{
        console.log(err)
    });
  }

  // unmark todo
  const unMarkTodo = async(itemID)=>{
    if(!itemID){
      console.log("itemID needed");
    }
    axios.post('http://localhost:8000/api/user/unmarkitem', 
    {itemID: itemID},
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    }).then(res=>{
        console.log(res);
        setnew(true)
    }
    ).catch(err=>{
        console.log(err)
    });
  }

  return (
    <div className="right-side">
      <div className="new-todo">
        <input type="text" name="newTodo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" />
        <button onClick={onSubmit}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} onMark={markTodo} onUnmark={unMarkTodo} onUpdate={updateTodo}/>
        ))}
      </div>
    </div>
  );
};

export default RightSide;
