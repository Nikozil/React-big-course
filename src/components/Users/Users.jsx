import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/images.png';
import { NavLink } from 'react-router-dom';
import { UsersAPI } from '../../api/api';
import { follow } from '../../Redax/users-reduser';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={s.pagesButtons}>
        {pages.map((p) => {
          return (
            <span
              className={
                s.Page + ' ' + (props.currentPage == p && s.selectedPage)
              }
              onClick={() => props.onPageChanged(p)}>
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map((i) => {
        return (
          <div key={i.id}>
            <span>
              <div>
                <NavLink to={`/profile/${i.id}`}>
                  <img
                    src={i.photos.small != null ? i.photos : userPhoto}
                    alt=""
                    className={s.photo}
                  />
                </NavLink>
              </div>
              <div>
                {i.followed ? (
                  <button
                    disabled={props.followingInProgress.some(
                      (id) => id === i.id
                    )}
                    onClick={() => {
                      props.unfollow(i.id);
                    }}>
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingInProgress.some(
                      (id) => id === i.id
                    )}
                    onClick={() => {
                      props.follow(i.id);
                    }}>
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <div>{i.name}</div>
              <div>{i.status}</div>
            </span>
            <span>
              {/* <div>{i.location.city}</div> */}
              {/* <div>{i.location.country}</div> */}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
