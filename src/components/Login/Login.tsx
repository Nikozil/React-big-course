import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../Redax/auth-reducer';
import { AppStateType } from '../../Redax/redux-store';
import { maxLengthCreator, required } from '../../utils/validators/validates';
import { CreateField, InputArea } from '../commons/FormControls/FormsControls';
import FC from '../commons/FormControls/FormsControls.module.css';
let maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
  captureUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captureUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {CreateField<LoginFormValuesKeys>(
        'Login',
        'email',
        [required, maxLength30],
        InputArea,
        'text'
      )}
      {CreateField<LoginFormValuesKeys>(
        'Password',
        'password',
        [required, maxLength30],
        InputArea,
        'password'
      )}
      {CreateField<LoginFormValuesKeys>(
        undefined,
        'rememberMe',
        [],
        'input',
        'checkbox',
        'Remember me'
      )}

      {captureUrl &&
        CreateField<LoginFormValuesKeys>(
          'captcha',
          'captcha',
          [required, maxLength30],
          InputArea,
          'text',
          null,
          captureUrl
        )}
      {error ? <div className={FC.formSummaryError}> {error}</div> : null}

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  // a unique name for the form
  form: 'login',
})(LoginForm);

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type LoginFormValuesKeys = Extract<keyof LoginFormValuesType, string>;

export const Login: React.FC = (props) => {
  const captureUrl = useSelector(
    (state: AppStateType) => state.auth.captureULR
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();

  const onSubmit = (formData: any) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };
  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm
        // login={props.login}
        captureUrl={captureUrl}
        onSubmit={onSubmit}
      />
    </div>
  );
};
