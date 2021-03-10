import * as axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

class ProfileAPIComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUsersProfile(response.data);
      });
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let WithUrlDataContainerComponent = withRouter(ProfileAPIComponent);

export default WithUrlDataContainerComponent;
