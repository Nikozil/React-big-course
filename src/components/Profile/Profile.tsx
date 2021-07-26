import React from 'react';
import { ProfileType } from '../../types/Types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
type PropsType = {
  isOwner: boolean;
  profile: ProfileType | null;
  status: string;
  updateUserStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (profile: ProfileType) => Promise<void>;
};
const Profile: React.FC<PropsType> = (props) => {
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
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
