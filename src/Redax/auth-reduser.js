import { stopSubmit } from 'redux-form';
import { AuthAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'learningReact/auth/SET_USER_DATA';
const SET_CAPTURE_URL = 'learningReact/auth/SET_CAPTURE_URL';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: true,
  captureULR: null,
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

export const makelogin = () => async (dispatch) => {
  let data = await AuthAPI.authme();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    let data = await AuthAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
      dispatch(makelogin());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptureURL());
      }
      let message =
        data.messages.length > 0 ? data.messages[0] : 'Email or pass is wrong';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    let data = await AuthAPI.logout();
    if (data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  };
};
export const getCaptureURL = () => {
  return async (dispatch) => {
    let url = await securityAPI.getCaptchaURL();
    dispatch(setCaptureUrl(url));
  };
};
export default authReducer;
