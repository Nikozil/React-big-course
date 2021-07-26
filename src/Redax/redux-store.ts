import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Action,
} from 'redux';
import authReducer from './auth-reduser';
import messagesReducer from './messages-reduse';
import profileReducer from './profile-reduser';
import sidebarReducer from './sidebar-reduser';
import usersReducer from './users-reduser';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
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
