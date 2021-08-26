import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Action,
} from 'redux';
import authReducer from './auth-reducer';
import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';
import chatReducer from './chat-reducer';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReducerType = typeof rootReducer; // (globalstate:GLOBALSTATE)=>GLOBALSTATE
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export type AppStateType = ReturnType<RootReducerType>;

//type PropertiesTipes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
