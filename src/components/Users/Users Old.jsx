import * as axios from 'axios';
import React from 'react';
import { unfollowAC } from '../../Redax/users-reduser';
import s from './Users.module.css';
import userPhoto from '../../assets/images/images.png';

const Users = (props) => {
  let getUsers = () => {
    if (props.users.length === 0) {
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users')
        .then((response) => {
          props.setUsers(response.data.items);
        });
    }
  };

  return (
    <div>
      <button onClick={() => getUsers()}>Get Users</button>
      {props.users.map((i) => {
        return (
          <div key={i.id}>
            <span>
              <div>
                <img
                  src={i.photos.small != null ? i.photos : userPhoto}
                  alt=""
                  className={s.photo}
                />
              </div>
              <div>
                {i.followed ? (
                  <button
                    onClick={() => {
                      props.unfollow(i.id);
                    }}>
                    Unfollow
                  </button>
                ) : (
                  <button
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
