import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';

const Profile = () => {
  return (
    <div className={s.content}>
      <div className={s.mainContent}>
        Main Content
        <br />
        <img
          src="https://home.bt.com/images/in-pictures-standoff-between-fox-and-marmot-wins-top-photography-prize-136440298151802601-191015231058.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://secure.i.telegraph.co.uk/multimedia/archive/01428/dodo220_1428231f.jpg"
          alt=""
          style={{ width: '100px' }}
        />
        decriptiom
      </div>
      <MyPosts />
    </div>
  );
};

export default Profile;
