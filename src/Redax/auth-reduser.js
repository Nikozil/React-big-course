import { AuthAPI } from '../api/api';
import { stopSubmit } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTURE_URL = 'SET_CAPTURE_URL';
const MAKE_CAPTURE = 'MAKE_CAPTURE';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: true,
  captureULR: '',
  securityCapture: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_CAPTURE_URL:
      return {
        ...state,
        captureULR: action.url,
      };
    case MAKE_CAPTURE:
      return {
        ...state,
        securityCapture: true,
      };

    default:
      return state;
  }
};

export const setUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth },
});
export const setCaptureUrl = (url) => ({
  type: SET_CAPTURE_URL,
  url: url,
});
export const makeCapture = () => ({
  type: MAKE_CAPTURE,
});

export const makelogin = () => {
  return (dispatch) => {
    AuthAPI.authme().then((data) => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setUserData(id, email, login, true));
      }
    });
  };
};
export const login = (email, password, rememberMe, captcha) => {
  return (dispatch) => {
    AuthAPI.login(email, password, rememberMe, captcha).then((data) => {
      if (data.resultCode === 10) {
        dispatch(makeCapture());
      }
      if (data.resultCode === 0) {
        dispatch(makelogin());
      } else {
        return { [FORM_ERROR]: 'Login Failed' };
      }
    });
  };
};
export const logout = () => {
  return (dispatch) => {
    AuthAPI.logout().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
      }
    });
  };
};
export const capture = () => {
  return (dispatch) => {
    AuthAPI.security().then((url) => {
      dispatch(setCaptureUrl(url));
    });
  };
};
export default authReducer;
