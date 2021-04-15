import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../assets/Preloaders/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Avatar from '../../commons/Avatar/Avatar';

const ProfileInfo = ({ profile, status, updateUserStatus }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div className={s.profileInfo}>
      <ProfileStatusWithHooks
        status={status}
        updateUserStatus={updateUserStatus}
      />
      <div>Имя: {profile.fullName}</div>
      <div>
        <Avatar owner={profile} size={'large'} className={s.photo} />
      </div>
      <div>Обо мне: {profile.aboutMe}</div>
      <div className={s.contacts}>
        Контакты:
        <ul>
          <li>
            facebook:{' '}
            <a href={profile.contacts.facebook}>{profile.contacts.facebook}</a>
          </li>
          <li>
            website:{' '}
            <a href={profile.contacts.website}>{profile.contacts.website}</a>
          </li>
          <li>
            vk: <a href={profile.contacts.vk}>{profile.contacts.vk}</a>
          </li>
          <li>
            twitter:{' '}
            <a href={profile.contacts.twitter}>{profile.contacts.twitter}</a>
          </li>
          <li>
            instagram:{' '}
            <a href={profile.contacts.instagram}>
              {profile.contacts.instagram}
            </a>
          </li>
          <li>
            youtube:{' '}
            <a href={profile.contacts.youtube}>{profile.contacts.youtube}</a>
          </li>
          <li>
            github:{' '}
            <a href={profile.contacts.github}>{profile.contacts.github}</a>
          </li>
          <li>
            mainLink:{' '}
            <a href={profile.contacts.mainLink}>{profile.contacts.mainLink}</a>
          </li>
        </ul>
      </div>
      <div>
        Работа:
        <div>{profile.lookingForAJob}</div>
        <div>{profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
