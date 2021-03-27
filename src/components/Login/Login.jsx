import React from 'react';
import s from './Login.module.css';
import { Form, Field } from 'react-final-form';
import { AuthAPI } from '../../api/api';
import { InputArea } from '../commons/FormControls/FormsControls';
import {
  composeValidators,
  maxLengthCreator,
  requireField,
} from '../utils/validators/validates';
import { connect } from 'react-redux';
import { login, capture } from '../../Redax/auth-reduser';
import { Redirect } from 'react-router';

const LoginForm = (props) => {
  if (props.url == '') props.capture();
  let img = props.url;

  return (
    <Form
      initialValues={{ email: 'Guest' }}
      onSubmit={(formData) => {
        props.login(
          formData.email,
          formData.password,
          formData.rememberMe,
          formData.captcha
        );
      }}
      render={({ submitError, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              component={InputArea}
              validate={composeValidators(requireField, maxLengthCreator(30))}
              name="email"
              type="text"
              placeholder={'Login'}
            />
          </div>
          <div>
            <Field
              component={InputArea}
              validate={composeValidators(requireField, maxLengthCreator(30))}
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
                validate={composeValidators(requireField, maxLengthCreator(30))}
                name="captcha"
                type={'text'}
              />
              captcha
            </div>
          ) : null}

          <div>
            <button type="submit">Login</button>
          </div>
          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm
        login={props.login}
        capture={props.capture}
        url={props.url}
        security={props.security}
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
