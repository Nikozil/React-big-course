import React from 'react';
import Users from './Users';
import Preloader from '../../assets/images/Preloader.gif';
import { UsersAPI } from '../../api/api';

class UsersAPIComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (p) => {
    this.props.getUsers(p, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <img src={Preloader} /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          onPageChanged={this.onPageChanged}
          currentPage={this.props.currentPage}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

export default UsersAPIComponent;
