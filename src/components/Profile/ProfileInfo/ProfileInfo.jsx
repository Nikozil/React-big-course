import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../assets/images/Preloader.gif';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <img src={Preloader} alt="" />;
  }
  return (
    <div className={s.profileInfo}>
      <ProfileStatus
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <div>Имя: {props.profile.fullName}</div>
      <div>
        <img src={props.profile.photos.large} alt="" />
      </div>
      <div>Обо мне: {props.profile.aboutMe}</div>
      <div className={s.contacts}>
        Контакты:
        <ul>
          <li>
            facebook:{' '}
            <a href={props.profile.contacts.facebook}>
              {props.profile.contacts.facebook}
            </a>
          </li>
          <li>
            website:{' '}
            <a href={props.profile.contacts.website}>
              {props.profile.contacts.website}
            </a>
          </li>
          <li>
            vk:{' '}
            <a href={props.profile.contacts.vk}>{props.profile.contacts.vk}</a>
          </li>
          <li>
            twitter:{' '}
            <a href={props.profile.contacts.twitter}>
              {props.profile.contacts.twitter}
            </a>
          </li>
          <li>
            instagram:{' '}
            <a href={props.profile.contacts.instagram}>
              {props.profile.contacts.instagram}
            </a>
          </li>
          <li>
            youtube:{' '}
            <a href={props.profile.contacts.youtube}>
              {props.profile.contacts.youtube}
            </a>
          </li>
          <li>
            github:{' '}
            <a href={props.profile.contacts.github}>
              {props.profile.contacts.github}
            </a>
          </li>
          <li>
            mainLink:{' '}
            <a href={props.profile.contacts.mainLink}>
              {props.profile.contacts.mainLink}
            </a>
          </li>
        </ul>
      </div>
      <div>
        Работа:
        <div>{props.profile.lookingForAJob}</div>
        <div>{props.profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
