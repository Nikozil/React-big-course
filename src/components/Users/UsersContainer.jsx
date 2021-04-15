import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  acceptfollow,
  setCurrentPage,
  acceptunfollow,
  toggleFollowingInProgress,
  requestUsers,
  follow,
  unfollow,
} from '../../Redax/users-reduser';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../Redax/users-selectors';
import UsersAPIComponent from './UsersAPIComponent';

let mapStateToProps = (state) => {
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
  connect(mapStateToProps, {
    acceptfollow,
    acceptunfollow,
    setCurrentPage,
    toggleFollowingInProgress,
    requestUsers,
    follow,
    unfollow,
  })
)(UsersAPIComponent);
