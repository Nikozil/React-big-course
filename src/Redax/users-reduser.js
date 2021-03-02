const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET USERS';

let initialState = {
  users: [],
  // users: [
  //   {
  //     id: 1,
  //     photoUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
  //     fullname: 'Dima',
  //     status: 'sleep',
  //     location: { city: 'Texas', country: 'USA' },
  //     followed: false,
  //   },
  //   {
  //     id: 2,
  //     photoUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
  //     fullname: 'Oleg',
  //     status: 'wakeup',
  //     location: { city: 'Boston', country: 'USA' },
  //     followed: true,
  //   },
  //   {
  //     id: 3,
  //     photoUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
  //     fullname: 'Ivan',
  //     status: 'work',
  //     location: { city: 'London', country: 'England' },
  //     followed: false,
  //   },
  //   {
  //     id: 4,
  //     photoUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
  //     fullname: 'Vladimir',
  //     status: 'eat',
  //     location: { city: 'Berlin', country: 'German' },
  //     followed: true,
  //   },
  // ],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((i) => {
          if (i.id === action.userId) {
            return { ...i, followed: true };
          }
          return i;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((i) => {
          if (i.id === action.userId) {
            return { ...i, followed: false };
          }
          return i;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    default:
      return state;
  }
};

export const followAC = (userId) => ({
  type: FOLLOW,
  userId,
});
export const unfollowAC = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const setUsersAC = (users) => ({
  type: SET_USERS,
  users,
});

export default usersReducer;
