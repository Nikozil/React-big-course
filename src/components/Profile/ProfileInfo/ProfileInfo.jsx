import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../assets/Preloaders/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Avatar from '../../commons/Avatar/Avatar';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);
  if (!profile) {
    return <Preloader />;
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={s.profileInfo}>
      <ProfileStatusWithHooks
        status={status}
        updateUserStatus={updateUserStatus}
        isOwner={isOwner}
      />
      <div className={s.avatarContainer}>
        <MainPageAvatar
          profile={profile}
          isOwner={isOwner}
          savePhoto={savePhoto}
        />
      </div>
      <div>
        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            goToEditMode={() => {
              setEditMode(true);
            }}
          />
        )}
      </div>
    </div>
  );
};
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <>
      <div>
        <b>Имя: </b>
        {profile.fullName}
      </div>
      <div>
        <b>Обо мне: </b>
        {profile.aboutMe}
      </div>
      <div>
        <b> Работа</b>
        <div>
          <b>Ищу работу: </b>
          {profile.lookingForAJob ? 'Да' : 'Нет'}
        </div>
        {profile.lookingForAJob && (
          <div>
            <b>Мои навыки: </b>
            {profile.lookingForAJobDescription}
          </div>
        )}
      </div>
      <div className={s.contacts}>
        <b>Контакты</b>
        <div>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>
      </div>
      <div>{isOwner && <button onClick={goToEditMode}>edit</button>}</div>
    </>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: <a href={contactValue}>{contactValue}</a>
    </div>
  );
};

const MainPageAvatar = ({ profile, isOwner, savePhoto }) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  return (
    <>
      <Avatar owner={profile} size={'large'} className={s.photo} />
      {isOwner && (
        <div>
          <label htmlFor={'image_uploads'} className={s.avatarButtonLabel}>
            Выберите файл
          </label>
          <input
            id={'image_uploads'}
            className={s.avatarButton}
            type={'file'}
            onChange={onMainPhotoSelected}
          />
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
