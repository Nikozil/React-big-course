import * as axios from 'axios';
import React from 'react';
import { unfollowAC } from '../../Redax/users-reduser';
import s from './Users.module.css';
import userPhoto from '../../assets/images/images.png';

const Users = (props) => {
  if (props.users.length === 0) {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then((response) => {
        props.setUsers(response.data.items);
      });
    //   props.setUsers([
    //     {
    //       id: 1,
    //       photoUrl:
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
    //       fullname: 'Dima',
    //       status: 'sleep',
    //       location: { city: 'Texas', country: 'USA' },
    //       followed: false,
    //     },
    //     {
    //       id: 2,
    //       photoUrl:
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
    //       fullname: 'Oleg',
    //       status: 'wakeup',
    //       location: { city: 'Boston', country: 'USA' },
    //       followed: true,
    //     },
    //     {
    //       id: 3,
    //       photoUrl:
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
    //       fullname: 'Ivan',
    //       status: 'work',
    //       location: { city: 'London', country: 'England' },
    //       followed: false,
    //     },
    //     {
    //       id: 4,
    //       photoUrl:
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwrowFvpvAj5NsToYvMI8GluLCOjy_MdiUg&usqp=CAU',
    //       fullname: 'Vladimir',
    //       status: 'eat',
    //       location: { city: 'Berlin', country: 'German' },
    //       followed: true,
    //     },
    //   ]);
  }

  return (
    <div>
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
