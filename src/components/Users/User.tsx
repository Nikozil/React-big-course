import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/Types';
import Avatar from '../commons/Avatar/Avatar';
import Follower from '../commons/Follower/Follower';
import s from './User.module.css';

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
};

const User: React.FC<PropsType> = ({
  user,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div>
      <hr />

      <span>
        <div style={{ marginBottom: '10px' }}>
          <NavLink to={`/profile/${user.id}`}>
            <Avatar owner={user} size={'small'} className={s.photo} />
          </NavLink>
        </div>
        <Follower
          user={user}
          followingInProgress={followingInProgress}
          follow={follow}
          unfollow={unfollow}
        />
      </span>
      <span>
        <div>Name: {user.name}</div>
        <div>Status: {user.status || '😊'}</div>
      </span>
    </div>
  );
};

export default User;
