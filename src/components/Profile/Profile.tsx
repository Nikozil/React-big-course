import { profile } from 'console';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { startChatting } from '../../Redax/messages-reducer';
import {
  savePhoto,
  saveProfile,
  updateUserStatus,
} from '../../Redax/profile-reducer';
import { AppStateType } from '../../Redax/redux-store';
import { ProfileType } from '../../types/Types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile: React.FC = () => {
  const profile = useSelector(
    (state: AppStateType) => state.profilePage.profile
  );
  const status = useSelector((state: AppStateType) => state.profilePage.status);
  const isOwner: boolean = !useRouteMatch('/profile/:userId');

  const dispatch = useDispatch();
  const updateUserStatusHandler = (status: string) =>
    dispatch(updateUserStatus(status));
  const savePhotoHandler = (photo: File) => dispatch(savePhoto(photo));

  const saveProfileHandler = (profile: ProfileType) =>
    //@ts-ignore
    dispatch(saveProfile(profile) as Promise<void>);

  const startChattingWithId = () => {
    if (profile?.userId) dispatch(startChatting(profile?.userId));
  };
  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatusHandler}
        savePhoto={savePhotoHandler}
        saveProfile={saveProfileHandler}
      />
      {!isOwner ? (
        <Link to="/dialogs" onClick={() => startChattingWithId()}>
          Начать чат
        </Link>
      ) : null}
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
