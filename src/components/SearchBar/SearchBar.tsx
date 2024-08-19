import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import UserList from '../UserList/UserList';
import { User } from '../../types/user';

const SearchBar: React.FC = () => {
  const users = useSelector((state: AppState) => state.users);
  const [expandedUsers, setExpandedUsers] = useState<{ [key: number]: boolean }>({});

  const handleUserClick = (user: User) => {
    setExpandedUsers(prev => ({ ...prev, [user.id]: !prev[user.id] }));
  };

  return (
    <div className="searchbar-wrapper">
      <UserList 
        users={users} 
        onUserClick={handleUserClick} 
        expandedUsers={expandedUsers} 
      />
    </div>
  );
};

export default SearchBar;
