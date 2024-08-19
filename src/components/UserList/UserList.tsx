import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; 
import { User } from '../../types/user';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
  expandedUsers: { [key: number]: boolean };
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick, expandedUsers }) => {
  return (
    <div className="user-list">
      {users.map((user) => {
        const isExpanded = expandedUsers[user.id];

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
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default UserList;
