import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import LeftSideDrawer from '../../components/leftsidedrawer/leftsidedrawer';
import RightSide from '../../components/rightside/rightside';
import './UserPage.css';
import axios from 'axios';

const UserPage = () => {
  const [selectedList, setSelectedList] = useState(null);
  const [newList, setnew] = useState(true)
  const handleListSelection = (listId) => {
    setSelectedList(listId);
  };
  
  // fetching all the lists user have.
  const [lists,setLists] = useState([]);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const storedUser = await localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          console.log(user)
          axios.post("http://localhost:8000/api/user/getlists",{
            userID: user.id
          },{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json', // You can add other headers as needed
            },
          }).then(result =>{
            console.log(result);
            setLists(result.data.lists);
            setSelectedList(result.data.lists[0]);
          }).catch(err=>{
            console.log(err);
          })
        } else {
          console.log('User not found in localStorage');
        }
        setnew(false);
      } catch (error) {
        console.error('Error fetching user from localStorage:', error);
      }
    };
  

    fetchUserLists();
  }, [newList]);

  useEffect(()=>{
    console.log("rerendering the components + ", lists);
  },[lists])

  const addList = async(newListName) =>{
    try {
      let user = await localStorage.getItem('user');
      user = JSON.parse(user);
      const userId = user.id;

      if (!newListName) {
        console.log('List name is needed');
        return;
      }

      const result = await axios.post(
        'http://localhost:8000/api/user/addList',
        {
          listName: newListName,
          userId: userId,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(result);
      setnew(true);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <Navbar />
      <div className="user-page">
        <LeftSideDrawer lists={lists} onSelectList={handleListSelection} addList={addList}/>
        <RightSide selectedList={selectedList} />
      </div>
    </div>
  );
};

export default UserPage;
