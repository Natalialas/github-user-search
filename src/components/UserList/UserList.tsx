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
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  expandedUsers,
  selectedUserRepos,
}) => {
  return (
    <div className="user-list">
      {users.map((user) => {
        const isExpanded = expandedUsers[user.id];
        const userRepos = selectedUserRepos[user.id] || [];

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
                <RepositoryList repos={userRepos} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default UserList;
