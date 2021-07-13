import React from 'react';
import Users from './Users';
import Preloader from '../../assets/Preloaders/Preloader';
import { UserType } from '../../types/Types';
import {
  MapDispatchPropsType,
  MapStatePropsType,
  OwnPropsType,
} from './UsersContainer';

// type UsersAPIPropsType = {
//   pageTitle: string;
//   currentPage: number;
//   pageSize: number;
//   isFetching: boolean;
//   totalUsersCount: number;
//   portionSize?: number;
//   users: Array<UserType>;
//   followingInProgress: Array<number>;

//   onPageChanged: (PageNumber: number) => void;
//   follow: () => void;
//   unfollow: () => void;
//   requestUsers: (currentPage: number, pageSize: number) => void;
// };
type UsersAPIPropsType = MapStatePropsType &
  MapDispatchPropsType &
  OwnPropsType;

class UsersAPIComponent extends React.Component<UsersAPIPropsType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }
  onPageChanged = (p: number) => {
    const { pageSize } = this.props;
    this.props.requestUsers(p, pageSize);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
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
