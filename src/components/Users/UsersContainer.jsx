import React from 'react';
import { connect } from 'react-redux';
import {
  acceptfollow,
  setCurrentPage,
  acceptunfollow,
  toggleFollowingInProgress,
  getUsers,
  follow,
  unfollow,
} from '../../Redax/users-reduser';
import UsersAPIComponent from './UsersAPIComponent';

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  acceptfollow,
  acceptunfollow,
  setCurrentPage,
  toggleFollowingInProgress,
  getUsers,
  follow,
  unfollow,
})(UsersAPIComponent);
