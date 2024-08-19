import { createStore, combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { repoReducer } from './repoReducer';

const rootReducer = combineReducers({
  users: userReducer,
  repos: repoReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
