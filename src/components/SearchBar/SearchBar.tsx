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
    setTotalReposCount({});
    setExpandedUsers({});
    setVisibleRepos({});
    setLoadingRepos({});
  };

  const handleUserClick = async (user: User) => {
    toggleUserExpansion(user.id);

    if (!selectedUserRepos[user.id]) {
      setLoadingRepos(prev => ({ ...prev, [user.id]: true }));

      const userDetails = await getUserDetails(user.login);
      const { repos } = await getUserRepos(user.login);

      if (repos.length > 0) {
        setSelectedUserRepos(prev => ({ ...prev, [user.id]: repos }));
        setTotalReposCount(prev => ({ ...prev, [user.id]: userDetails.public_repos }));
        setVisibleRepos(prev => ({ ...prev, [user.id]: Math.min(repos.length, 5) }));
      }

      setLoadingRepos(prev => ({ ...prev, [user.id]: false }));
    }
  };

  const toggleUserExpansion = (userId: number) => {
    setExpandedUsers(prev => ({ ...prev, [userId]: !prev[userId] }));
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

  const isAnyUserExpanded = Object.values(expandedUsers).some(Boolean);

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-container">
        <h1 className="searchbar-title">GitHub User and Repository Search</h1>
        <input 
          type="text" 
          placeholder="Enter username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="searchbar-input"
        />
        <button onClick={handleSearch} className="searchbar-button">Search</button>

        {!isAnyUserExpanded && users.length > 0 && (
          <div className="current-search-info">
            <p>Showing users for "{searchedUser}"</p>
          </div>
        )}

        <UserList 
          users={users} 
          onUserClick={handleUserClick} 
          selectedUserRepos={selectedUserRepos} 
          expandedUsers={expandedUsers}
          loadMoreRepos={loadMoreRepos}
          visibleRepos={visibleRepos}
          totalReposCount={totalReposCount}
          loadingRepos={loadingRepos}
        />
      </div>
    </div>
  );
};

export default SearchBar;

