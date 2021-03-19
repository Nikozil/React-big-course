import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reduser';
import messagesReducer from './messages-reduse';
import profileReducer from './profile-reduser';
import sidebarReducer from './sidebar-reduser';
import usersReducer from './users-reduser';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
