import { stopSubmit } from 'redux-form';
import { AuthAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'learningReact/auth/SET_USER_DATA';
const SET_CAPTURE_URL = 'learningReact/auth/SET_CAPTURE_URL';

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false as boolean,
  isFetching: true as boolean,
  captureULR: null as null | string,
};
export type initialStateType = typeof initialState;

const authReducer = (
  state: initialStateType = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
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
type setUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type setUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: setUserDataActionPayloadType;
};

export const setUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): setUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type setCaptureUrlActionType = {
  type: typeof SET_CAPTURE_URL;
  url: string | null;
};
export const setCaptureUrl = (url: string): setCaptureUrlActionType => ({
  type: SET_CAPTURE_URL,
  url: url,
});

export const makelogin = () => async (dispatch: any) => {
  let data = await AuthAPI.authme();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
    let data = await AuthAPI.logout();
    if (data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  };
};
export const getCaptureURL = () => {
  return async (dispatch: any) => {
    let url = await securityAPI.getCaptchaURL();
    dispatch(setCaptureUrl(url));
  };
};
export default authReducer;
