import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import LeftSideDrawer from '../../components/leftsidedrawer/leftsidedrawer';
import RightSide from '../../components/rightside/rightside';
import './UserPage.css';

const UserPage = () => {
  const [selectedList, setSelectedList] = useState(null);
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
          console.log(user);
          setLists(user.lists);
          setSelectedList(user.lists[0]);
        } else {
          console.log('User not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user from localStorage:', error);
      }
    };
  
    fetchUserLists();
  }, []);
  

  return (
    <div>
      <Navbar />
      <div className="user-page">
        <LeftSideDrawer lists={lists} onSelectList={handleListSelection} />
        <RightSide selectedList={selectedList} />
      </div>
    </div>
  );
};

export default UserPage;
