import React from 'react';
import { FilterType } from '../../Redax/users-reducer';
import { UserType } from '../../types/Types';
import Paginator from '../commons/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (PageNumber: number) => void;
  portionSize?: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  onFilterChanged: (filter: FilterType) => void;
};

const Users: React.FC<PropsType> = ({
  currentPage,
  onPageChanged,
  onFilterChanged,
  totalUsersCount,
  pageSize,
  users,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />

      {users.map((i) => {
        return (
          <User
            user={i}
            key={i.id}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
          />
        );
      })}
    </div>
  );
};
export default Users;
