import React from 'react';
import { withRouter } from 'react-router';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  setUsersProfile,
  getUsersProfile,
  getUserStatus,
  updateUserStatus,
} from '../../Redax/profile-reduser';
import { compose } from 'redux';
class ProfileContainer extends React.Component {
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
