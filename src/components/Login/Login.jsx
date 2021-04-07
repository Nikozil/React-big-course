import React from 'react';
import s from './Login.module.css';
import { Field, reduxForm } from 'redux-form';
import { AuthAPI } from '../../api/api';
import { InputArea } from '../commons/FormControls/FormsControls';
import {
  composeValidators,
  maxLengthCreator,
  required,
} from '../utils/validators/validates';
import { connect } from 'react-redux';
import { login, capture } from '../../Redax/auth-reduser';
import { Redirect } from 'react-router';
import FC from '../commons/FormControls/FormsControls.module.css';
let maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
  if (props.url == '') props.capture();
  let img = props.url;

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={InputArea}
          validate={[required, maxLength30]}
          name="email"
          type="text"
          placeholder={'Login'}
        />
      </div>
      <div>
        <Field
          component={InputArea}
          validate={[required, maxLength30]}
          name="password"
          type="password"
          placeholder={'Password'}
        />
      </div>
      <div>
        <Field component={'input'} name="rememberMe" type={'checkbox'} />
        Remember me
      </div>
      {props.security ? (
        <div>
          <img src={img} alt="" />
          <Field
            component={InputArea}
            validate={[required, maxLength30]}
            name="captcha"
            type={'text'}
          />
          captcha
        </div>
      ) : null}
      {props.error ? (
        <div className={FC.formSummaryError}> {props.error}</div>
      ) : null}

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: 'login',
})(LoginForm);

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }
  const onSubmit = (formData) => {
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
        login={props.login}
        capture={props.capture}
        url={props.url}
        security={props.security}
        onSubmit={onSubmit}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    url: state.auth.captureULR,
    security: state.auth.securityCapture,
  };
};

export default connect(mapStateToProps, { login, capture })(Login);
