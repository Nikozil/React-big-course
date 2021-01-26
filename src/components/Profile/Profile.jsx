import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = () => {
  return (
    <div>
      <div className={s.mainContent}>
        Main Content
        <br />
        <img
          src="https://home.bt.com/images/in-pictures-standoff-between-fox-and-marmot-wins-top-photography-prize-136440298151802601-191015231058.jpg"
          alt=""
        />
      </div>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default Profile;
