import usersReducer, { actions, initialStateType } from './users-reducer';

let state: initialStateType;
beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Ivan 1',
        followed: false,
        photos: { small: null, large: null },
        status: 'status0',
      },
      {
        id: 1,
        name: 'Ivan 2',
        followed: false,
        photos: { small: null, large: null },
        status: 'status1',
      },
      {
        id: 2,
        name: 'Ivan 3',
        followed: true,
        photos: { small: null, large: null },
        status: 'status2',
      },
      {
        id: 3,
        name: 'Ivan 4',
        followed: true,
        photos: { small: null, large: null },
        status: 'status3',
      },
    ],
    pageSize: 10,
    totalUsersCount: 24,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  };
});

test('follow success ', () => {
  //userReducer()

  const newState = usersReducer(state, actions.acceptfollow(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});
test('unfollow success ', () => {
  //userReducer()

  const newState = usersReducer(state, actions.acceptunfollow(3));
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
