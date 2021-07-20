import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../Redax/redux-store';
import { requestUsers, follow, unfollow } from '../../Redax/users-reduser';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../Redax/users-selectors';
import { UserType } from '../../types/Types';
import UsersAPIComponent from './UsersAPIComponent';

export type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  totalUsersCount: number;
  isFetching: boolean;
  portionSize?: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
};

export type MapDispatchPropsType = {
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  requestUsers: (currentPage: number, pageSize: number) => void;
};

export type OwnPropsType = {
  pageTitle: string;
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      requestUsers,
      follow,
      unfollow,
    }
  )
)(UsersAPIComponent);
//<AppStateType>
