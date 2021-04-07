import { UsersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET USERS';
const SET_CURRENT_PAGE = 'SET CURRENT PAGE';
const SET_TOTAL_USERS_COUNT = 'SET TOTAL USERS COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE IS FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE IS FOLLOWING PROGRESS';

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 24,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
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
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [...state.followingInProgress.filter((id) => id !== action.userId)],
      };
    default:
      return state;
  }
};

export const acceptfollow = (userId) => ({
  type: FOLLOW,
  userId,
});
export const acceptunfollow = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingInProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  userId,
  isFetching,
});

export const requestUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    UsersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
      dispatch(toggleIsFetching(false));
    });
  };
};
export const follow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, id));

    UsersAPI.follow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(acceptfollow(id));
      }
      dispatch(toggleFollowingInProgress(false, id));
    });
  };
};
export const unfollow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, id));

    UsersAPI.unfollow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(acceptunfollow(id));
      }
      dispatch(toggleFollowingInProgress(false, id));
    });
  };
};

export default usersReducer;