import { User } from '../types/user';

const initialState: User[] = [];

export const userReducer = (state = initialState, action: any): User[] => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    default:
      return state;
  }
};
