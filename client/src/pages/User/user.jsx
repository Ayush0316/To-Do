import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import LeftSideDrawer from '../../components/leftsidedrawer/leftsidedrawer';
import RightSide from '../../components/rightside/rightside';
import './UserPage.css';

const UserPage = () => {
  const [selectedList, setSelectedList] = useState(null);

  const handleListSelection = (listId) => {
    setSelectedList(listId);
  };

  return (
    <div>
      <Navbar />
      <div className="user-page">
        <LeftSideDrawer onSelectList={handleListSelection} />
        <RightSide selectedList={selectedList} />
      </div>
    </div>
  );
};

export default UserPage;
