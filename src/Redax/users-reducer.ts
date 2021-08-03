import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { ResultCodeEnum, SuccessRequestType } from '../api/api';
import { UsersAPI } from '../api/users-api';
import { UserType } from '../types/Types';
import { updateObjectInArray } from '../utils/objects-helpers';
import { AppStateType, InferActionsTypes } from './redux-store';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 24,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of users ids
  filter: {
    term: '',
    friend: null as null | boolean,
  },
};
export type initialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

export const usersReducer = (
  state: initialStateType = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'learningReact/users/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    case 'learningReact/users/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      };
    case 'learningReact/users/SET_USERS':
      return {
        ...state,
        users: action.users,
      };
    case 'learningReact/users/SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'learningReact/users/SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };
    case 'learningReact/users/TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'learningReact/users/TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [...state.followingInProgress.filter((id) => id !== action.userId)],
      };
    case 'learningReact/users/SET_Filter':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  acceptfollow: (userId: number) =>
    ({
      type: 'learningReact/users/FOLLOW',
      userId,
    } as const),
  acceptunfollow: (userId: number) =>
    ({
      type: 'learningReact/users/UNFOLLOW',
      userId,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: 'learningReact/users/SET_USERS',
      users,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: 'learningReact/users/SET_CURRENT_PAGE',
      currentPage,
    } as const),
  setTotalUsersCount: (totalCount: number) =>
    ({
      type: 'learningReact/users/SET_TOTAL_USERS_COUNT',
      totalCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'learningReact/users/TOGGLE_IS_FETCHING',
      isFetching,
    } as const),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'learningReact/users/TOGGLE_IS_FOLLOWING_PROGRESS',
      userId,
      isFetching,
    } as const),
  setFilter: (filter: FilterType) =>
    ({
      type: 'learningReact/users/SET_Filter',
      payload: filter,
    } as const),
};

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const requestUsers = (
  page: number,
  pageSize: number,
  filter: FilterType
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));

    let data = await UsersAPI.getUsers(page, pageSize, filter);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  id: number,
  apiMethod: (id: number) => Promise<SuccessRequestType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingInProgress(true, id));
  let data = await apiMethod(id);
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(id));
  }
  dispatch(actions.toggleFollowingInProgress(false, id));
};
export const follow = (id: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      id,
      UsersAPI.follow.bind(UsersAPI),
      actions.acceptfollow
    );
  };
};
export const unfollow = (id: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      id,
      UsersAPI.unfollow.bind(UsersAPI),
      actions.acceptunfollow
    );
  };
};

export default usersReducer;
