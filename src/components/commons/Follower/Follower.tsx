import React from 'react';
import { UserType } from '../../../types/Types';

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
};

const Follower: React.FC<PropsType> = ({
  user,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div>
      {user.followed ? (
        <button
          disabled={followingInProgress.some((id) => id === user.id)}
          onClick={() => {
            unfollow(user.id);
          }}>
          Unfollow
        </button>
      ) : (
        <button
          disabled={followingInProgress.some((id) => id === user.id)}
          onClick={() => {
            follow(user.id);
          }}>
          Follow
        </button>
      )}
    </div>
  );
};

export default Follower;
