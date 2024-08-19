import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { getUserRepos, searchUsers, getUserDetails } from '../../api/githubApi';
import UserList from '../UserList/UserList';
import { User } from '../../types/user';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.users);
  const [username, setUsername] = useState('');
  const [searchedUser, setSearchedUser] = useState('');
  const [expandedUsers, setExpandedUsers] = useState<{ [key: number]: boolean }>({});
  const [selectedUserRepos, setSelectedUserRepos] = useState<{ [key: number]: any[] }>({});
  const [totalReposCount, setTotalReposCount] = useState<{ [key: number]: number }>({});
  const [visibleRepos, setVisibleRepos] = useState<{ [key: number]: number }>({});
  const [loadingRepos, setLoadingRepos] = useState<{ [key: number]: boolean }>({});

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
      setLoadingRepos(prev => ({ ...prev, [user.id]: true }));
  
      const userDetails = await getUserDetails(user.login);
      setTotalReposCount(prev => ({ ...prev, [user.id]: userDetails.public_repos }));
  
      const { repos } = await getUserRepos(user.login);
      setSelectedUserRepos(prev => ({ ...prev, [user.id]: repos }));
      setLoadingRepos(prev => ({ ...prev, [user.id]: false }));
    }
  };

  const loadMoreRepos = async (userId: number) => {
    const currentPage = Math.ceil((visibleRepos[userId] || 5) / 5);
    const { repos } = await getUserRepos(users.find(u => u.id === userId)?.login || '', currentPage + 1);

    if (repos.length > 0) {
      setSelectedUserRepos(prev => ({
        ...prev,
        [userId]: [...prev[userId], ...repos],
      }));
      setVisibleRepos(prev => ({
        ...prev,
        [userId]: prev[userId] + repos.length,
      }));
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
        totalReposCount={totalReposCount}
        loadMoreRepos={loadMoreRepos}
        visibleRepos={visibleRepos}
      />
    </div>
  );
};

export default SearchBar;
