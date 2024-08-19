import { Repository } from '../types/repository';

const initialState: Repository[] = [];

export const repoReducer = (state = initialState, action: any): Repository[] => {
  switch (action.type) {
    case 'SET_REPOS':
      return action.payload;
    default:
      return state;
  }
};
