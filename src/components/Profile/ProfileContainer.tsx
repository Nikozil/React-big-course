import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
  actions,
  getUsersProfile,
  getUserStatus,
  savePhoto,
  saveProfile,
  updateUserStatus,
} from '../../Redax/profile-reducer';
import { AppStateType } from '../../Redax/redux-store';
import { ProfileType } from '../../types/Types';
import Profile from './Profile';

type PathParamsType = {
  userId: string;
};

type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = +this.props.match.params.userId;
    if (!userId) {
      if (this.props.authUserId) {
        userId = +this.props.authUserId;
      } else {
        this.props.history.push('/login');
      }
    }
    this.props.getUsersProfile(userId);
    this.props.getUserStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

type MapStatePropsType = {
  profile: ProfileType | null;
  status: string;
  authUserId: number | null;
  isAuth: boolean;
};
type MapDispatchPropsType = {
  setUsersProfile: (profile: ProfileType) => void;
  getUsersProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateUserStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (profile: ProfileType) => Promise<void>;
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    setUsersProfile: actions.setUsersProfile,
    getUsersProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
