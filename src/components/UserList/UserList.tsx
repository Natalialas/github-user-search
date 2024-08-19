import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; 
import { User } from '../../types/user';
import RepositoryList from '../RepositoryList/RepositoryList';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
  expandedUsers: { [key: number]: boolean };
  selectedUserRepos: { [key: number]: any[] };
  loadMoreRepos: (userId: number) => void;
  visibleRepos: { [key: number]: number };
  totalReposCount: { [key: number]: number };
  loadingRepos: { [key: number]: boolean };
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  expandedUsers,
  selectedUserRepos,
  loadMoreRepos,
  visibleRepos,
  totalReposCount,
  loadingRepos,
}) => {
  return (
    <div className="user-list">
      {users.map((user) => {
        const isExpanded = expandedUsers[user.id];
        const userRepos = selectedUserRepos[user.id] || [];
        const visibleCount = visibleRepos[user.id] || 5;
        const totalCount = totalReposCount[user.id] || 0;

        return (
          <React.Fragment key={user.id}>
            <div className="user-item" onClick={() => onUserClick(user)}>
              <div className="user-header">
                <h3>{user.login}</h3>
                <span className="dropdown-icon">
                  <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                </span>
              </div>
            </div>

            {isExpanded && (
              <div className="user-repos">
                {loadingRepos[user.id] ? (
                  <p>Loading repositories...</p>
                ) : userRepos.length === 0 ? (
                  <p>No repositories available for this user.</p>
                ) : (
                  <>
                    <RepositoryList repos={userRepos.slice(0, visibleCount)} />
                    {visibleCount < totalCount && (
                      <button className="show-more-button" onClick={() => loadMoreRepos(user.id)}>
                        Show more
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default UserList;
