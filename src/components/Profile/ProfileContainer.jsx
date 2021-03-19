import * as axios from 'axios';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { UsersAPI } from '../../api/api';
import { connect } from 'react-redux';
import { setUsersProfile, getUsersProfile } from '../../Redax/profile-reduser';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUsersProfile(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

export default connect(mapStateToProps, { setUsersProfile, getUsersProfile })(
  WithUrlDataContainerComponent
);
