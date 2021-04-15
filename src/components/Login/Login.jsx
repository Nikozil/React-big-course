import React from 'react';
import { reduxForm } from 'redux-form';
import { CreateField, InputArea } from '../commons/FormControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validates';
import { connect } from 'react-redux';
import { login, capture } from '../../Redax/auth-reduser';
import { Redirect } from 'react-router';
import FC from '../commons/FormControls/FormsControls.module.css';
let maxLength30 = maxLengthCreator(30);

const LoginForm = ({ handleSubmit, error, url, security, capture }) => {
  if (url === '') capture();
  let img = url;

  return (
    <form onSubmit={handleSubmit}>
      {CreateField(
        'Login',
        'email',
        [required, maxLength30],
        InputArea,
        'text'
      )}
      {CreateField(
        'Password',
        'password',
        [required, maxLength30],
        InputArea,
        'password'
      )}
      {CreateField(null, 'rememberMe', [], 'input', 'checkbox', 'Remember me')}

      {security
        ? CreateField(
            'Password',
            'captcha',
            [required, maxLength30],
            InputArea,
            'text',
            null,
            img
          )
        : null}
      {error ? <div className={FC.formSummaryError}> {error}</div> : null}

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
