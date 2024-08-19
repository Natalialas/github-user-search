import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { getUserRepos } from '../../api/githubApi';
import UserList from '../UserList/UserList';
import { User } from '../../types/user';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.users);
  const [expandedUsers, setExpandedUsers] = useState<{ [key: number]: boolean }>({});
  const [selectedUserRepos, setSelectedUserRepos] = useState<{ [key: number]: any[] }>({});

  const handleUserClick = async (user: User) => {
    setExpandedUsers(prev => ({ ...prev, [user.id]: !prev[user.id] }));

    if (!selectedUserRepos[user.id]) {
      const { repos } = await getUserRepos(user.login);
      setSelectedUserRepos(prev => ({ ...prev, [user.id]: repos }));
    }
  };

  return (
    <div className="searchbar-wrapper">
      <UserList 
        users={users} 
        onUserClick={handleUserClick} 
        expandedUsers={expandedUsers} 
        selectedUserRepos={selectedUserRepos}
      />
    </div>
  );
};

export default SearchBar;
