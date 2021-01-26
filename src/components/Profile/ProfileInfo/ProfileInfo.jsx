import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          src="https://secure.i.telegraph.co.uk/multimedia/archive/01428/dodo220_1428231f.jpg"
          alt=""
          style={{ width: '100px' }}
        />
        <div className={s.descriptionBlock}>description</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
