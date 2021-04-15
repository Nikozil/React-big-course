import { UsersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/objects-helpers';

const FOLLOW = 'learningReact/users/FOLLOW';
const UNFOLLOW = 'learningReact/users/UNFOLLOW';
const SET_USERS = 'learningReact/users/SET USERS';
const SET_CURRENT_PAGE = 'learningReact/users/SET CURRENT PAGE';
const SET_TOTAL_USERS_COUNT = 'learningReact/users/SET TOTAL USERS COUNT';
const TOGGLE_IS_FETCHING = 'learningReact/users/TOGGLE IS FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS =
  'learningReact/users/TOGGLE IS FOLLOWING PROGRESS';

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
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
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

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await UsersAPI.getUsers(page, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  };
};

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
  dispatch(toggleFollowingInProgress(true, id));
  let data = await apiMethod(id);
  if (data.resultCode === 0) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleFollowingInProgress(false, id));
};
export const follow = (id) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      id,
      UsersAPI.follow.bind(UsersAPI),
      acceptfollow
    );
  };
};
export const unfollow = (id) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      id,
      UsersAPI.unfollow.bind(UsersAPI),
      acceptunfollow
    );
  };
};

export default usersReducer;
