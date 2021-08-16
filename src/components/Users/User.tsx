import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/Types';
import Avatar from '../commons/Avatar/Avatar';
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
      </span>
      <span>
        <div>Name: {user.name}</div>
        <div>Status: {user.status || '😊'}</div>
      </span>
    </div>
  );
};

export default User;
