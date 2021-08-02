import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { CreateField, InputArea } from '../commons/FormControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validates';
import { connect } from 'react-redux';
import { login } from '../../Redax/auth-reducer';
import { Redirect } from 'react-router';
import FC from '../commons/FormControls/FormsControls.module.css';
import { AppStateType } from '../../Redax/redux-store';
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

type MapStateToPropsType = {
  isAuth: boolean;
  captureUrl: string | null;
};
type MapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type LoginFormValuesKeys = Extract<keyof LoginFormValuesType, string>;

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (
  props
) => {
  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }
  const onSubmit = (formData: any) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm
        // login={props.login}
        captureUrl={props.captureUrl}
        onSubmit={onSubmit}
      />
    </div>
  );
};
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    captureUrl: state.auth.captureULR,
  };
};

export default connect(mapStateToProps, { login })(Login);
