import React from 'react';
import { connect } from 'react-redux';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileAPIComponent from './ProfileAPIComponent';
import { setUsersProfile } from '../../Redax/profile-reduser';

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

export default connect(mapStateToProps, { setUsersProfile })(
  ProfileAPIComponent
);
