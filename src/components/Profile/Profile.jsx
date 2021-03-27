import React from 'react';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div>
      {/* <div className={s.mainContent}>
        Main Content
        <br />
        <img
          src="https://home.bt.com/images/in-pictures-standoff-between-fox-and-marmot-wins-top-photography-prize-136440298151802601-191015231058.jpg"
          alt=""
        />
      </div> */}
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
