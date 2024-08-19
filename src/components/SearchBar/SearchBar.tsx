import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { getUserRepos, searchUsers } from '../../api/githubApi';
import UserList from '../UserList/UserList';
import { User } from '../../types/user';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.users);
  const [username, setUsername] = useState('');
  const [searchedUser, setSearchedUser] = useState('');
  const [expandedUsers, setExpandedUsers] = useState<{ [key: number]: boolean }>({});
  const [selectedUserRepos, setSelectedUserRepos] = useState<{ [key: number]: any[] }>({});

  const handleSearch = async () => {
    const result = await searchUsers(username);
    dispatch({ type: 'SET_USERS', payload: result });
    setSearchedUser(username);
    resetState();
  };

  const resetState = () => {
    setSelectedUserRepos({});
    setExpandedUsers({});
  };

  const handleUserClick = async (user: User) => {
    setExpandedUsers(prev => ({ ...prev, [user.id]: !prev[user.id] }));

    if (!selectedUserRepos[user.id]) {
      const { repos } = await getUserRepos(user.login);
      setSelectedUserRepos(prev => ({ ...prev, [user.id]: repos }));
    }
  };

  return (
    <div className="searchbar-wrapper">
      <input 
        type="text" 
        placeholder="Enter username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="searchbar-input"
      />
      <button onClick={handleSearch} className="searchbar-button">Search</button>

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
