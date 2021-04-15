import profileReducer, {
  addPostActionCreator,
  deletePost,
} from './profile-reduser';
//1. test data
let state = {
  posts: [
    { id: 1, message: 'Hi, how are your?', likesCount: 2 },
    { id: 2, message: "It's my first", likesCount: 3 },
    { id: 3, message: 'olololo', likesCount: 20 },
  ],
};

test('length of post should be incremented', () => {
  let action = addPostActionCreator('hello');

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts.length).toBe(4);
});
test('message of new post should be corrected ', () => {
  let action = addPostActionCreator('hello');

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts[3].message).toBe('hello');
});
test('after deleting length of messages sould be decrement', () => {
  let action = deletePost(1);

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts.length).toBe(2);
});
test('after deleting length of messages sould not be decrement, if id incorrect', () => {
  let action = deletePost(10000);

  //2. action
  let newState = profileReducer(state, action);
  //3. expectations
  expect(newState.posts.length).toBe(3);
});
