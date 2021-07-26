import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';
import FC from '../../commons/FormControls/FormsControls.module.css';

import {
  CreateField,
  GetStringKeys,
  InputArea,
  TextArea,
} from '../../commons/FormControls/FormsControls';
import { ProfileType } from '../../../types/Types';

type PropsType = {
  profile: ProfileType;
};
type ProfileTypeKeys = GetStringKeys<ProfileType>;
const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <b>Имя: </b>
        {CreateField<ProfileTypeKeys>(
          'Полное имя',
          'fullName',
          [],
          InputArea,
          'text'
        )}
      </div>
      <div>
        <b>Обо мне: </b>
        {CreateField<ProfileTypeKeys>(
          'Обо мне',
          'aboutMe',
          [],
          TextArea,
          'text'
        )}
      </div>
      <div>
        <b> Работа</b>
        <div>
          <b>Ищу работу: </b>
          {CreateField<ProfileTypeKeys>(
            '',
            'lookingForAJob',
            [],
            InputArea,
            'checkbox'
          )}
        </div>
        <div>
          <b>Мои навыки: </b>
          {CreateField<ProfileTypeKeys>(
            'Мои навыки',
            'lookingForAJobDescription',
            [],
            TextArea,
            'text'
          )}
        </div>
      </div>
      <div className={s.contacts}>
        <b>Контакты:</b>
        <div>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div className={s.contact} key={key}>
                <b>{key}</b>:
                {CreateField(key, 'contacts.' + key, [], InputArea, 'text')}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button onClick={() => {}}>save</button>
      </div>
      {error ? <div className={FC.formSummaryError}> {error}</div> : null}
    </form>
  );
};

const ProfileDataReduxFrom = reduxForm<ProfileType, PropsType>({
  // a unique name for the form
  form: 'profileData',
})(ProfileDataForm);
export default ProfileDataReduxFrom;
