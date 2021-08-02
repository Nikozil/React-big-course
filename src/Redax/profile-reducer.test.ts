import profileReducer, { actions, InitialStateType } from './profile-reducer';
import { AppStateType } from './redux-store';
//1. test data
let state: InitialStateType = {
  posts: [
    { id: 1, message: 'Hi, how are your?', likesCount: 2 },
    { id: 2, message: "It's my first", likesCount: 3 },
    { id: 3, message: 'olololo', likesCount: 20 },
  ],
  profile: null,
  status: '',
  newPostText: '',
};

test('length of post should be incremented', () => {
  let action = actions.addPostActionCreator('hello');

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts.length).toBe(4);
});
test('message of new post should be corrected ', () => {
  let action = actions.addPostActionCreator('hello');

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts[3].message).toBe('hello');
});
test('after deleting length of messages sould be decrement', () => {
  let action = actions.deletePost(1);

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts.length).toBe(2);
});
test('after deleting length of messages sould not be decrement, if id incorrect', () => {
  let action = actions.deletePost(10000);

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts.length).toBe(3);
});
