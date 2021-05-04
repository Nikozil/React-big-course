import React from 'react';
import Paginator from '../commons/Paginator/Paginator';
import User from './User';

const Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  users,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div>
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
