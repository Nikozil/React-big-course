import { combineReducers, createStore } from 'redux';
import messagesReducer from './messages-reduse';
import profileReducer from './profile-reduser';
import sidebarReducer from './sidebar-reduser';

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
});

let store = createStore(reducers);

export default store;
