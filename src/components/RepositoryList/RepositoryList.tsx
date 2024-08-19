import React from 'react';
import { Repository } from '../../types/repository';

interface RepositoryListProps {
  repos: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repos }) => {
  return (
    <div className="repository-list">
      {repos.map(repo => (
        <div key={repo.id} className="repository-item">
          <div>
            <h4>{repo.name}</h4>
            <p>{repo.description || 'No description available'}</p>
          </div>
          <div className="repo-details">
            <span className="repo-stars">★ {repo.stargazers_count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
