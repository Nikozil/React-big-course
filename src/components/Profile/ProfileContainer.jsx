import * as axios from 'axios';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { UsersAPI } from '../../api/api';
import { connect } from 'react-redux';
import {
  setUsersProfile,
  getUsersProfile,
  getUserStatus,
  updateUserStatus,
} from '../../Redax/profile-reduser';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }
    this.props.getUsersProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, {
    setUsersProfile,
    getUsersProfile,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter
)(ProfileContainer);
