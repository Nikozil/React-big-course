import React from 'react';
import Preloader from '../../assets/Preloaders/Preloader';
import { FilterType } from '../../Redax/users-reducer';
import Users from './Users';
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
    const { currentPage, pageSize, filter } = this.props;
    this.props.requestUsers(currentPage, pageSize, filter);
  }
  onPageChanged = (p: number) => {
    const { pageSize, filter } = this.props;
    this.props.requestUsers(p, pageSize, filter);
  };
  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;

    this.props.requestUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            onFilterChanged={this.onFilterChanged}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

export default UsersAPIComponent;
