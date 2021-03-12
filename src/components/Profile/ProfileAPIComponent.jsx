import * as axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { UsersAPI } from '../../api/api';

class ProfileAPIComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    UsersAPI.getProfile(userId).then((data) => {
      this.props.setUsersProfile(data);
    });
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let WithUrlDataContainerComponent = withRouter(ProfileAPIComponent);

export default WithUrlDataContainerComponent;
