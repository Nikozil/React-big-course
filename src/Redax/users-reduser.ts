import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { ResultCodeEnum, UsersAPI } from '../api/api';
import { PhotosType, UserType } from '../types/Types';
import { updateObjectInArray } from '../utils/objects-helpers';
import { AppStateType } from './redux-store';

const FOLLOW = 'learningReact/users/FOLLOW';
const UNFOLLOW = 'learningReact/users/UNFOLLOW';
const SET_USERS = 'learningReact/users/SET USERS';
const SET_CURRENT_PAGE = 'learningReact/users/SET CURRENT PAGE';
const SET_TOTAL_USERS_COUNT = 'learningReact/users/SET TOTAL USERS COUNT';
const TOGGLE_IS_FETCHING = 'learningReact/users/TOGGLE IS FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS =
  'learningReact/users/TOGGLE IS FOLLOWING PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 24,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of users ids
};
type initialStateType = typeof initialState;

const usersReducer = (
  state: initialStateType = initialState,
  action: ActionsTypes
): initialStateType => {
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
type ActionsTypes =
  | AcceptfollowActionType
  | AcceptunfollowActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalUsersCountActionType
  | ToggleIsFetchingActionType
  | ToggleFollowingInProgressActionType;

type AcceptfollowActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export const acceptfollow = (userId: number): AcceptfollowActionType => ({
  type: FOLLOW,
  userId,
});

type AcceptunfollowActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const acceptunfollow = (userId: number): AcceptunfollowActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalCount: number;
};
export const setTotalUsersCount = (
  totalCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingInProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  userId: number;
  isFetching: boolean;
};
export const toggleFollowingInProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingInProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  userId,
  isFetching,
});

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await UsersAPI.getUsers(page, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: any,
  actionCreator: (
    userId: number
  ) => AcceptfollowActionType | AcceptunfollowActionType
) => {
  dispatch(toggleFollowingInProgress(true, id));
  let data = await apiMethod(id);
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleFollowingInProgress(false, id));
};
export const follow = (id: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      id,
      UsersAPI.follow.bind(UsersAPI),
      acceptfollow
    );
  };
};
export const unfollow = (id: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      id,
      UsersAPI.unfollow.bind(UsersAPI),
      acceptunfollow
    );
  };
};

export default usersReducer;
