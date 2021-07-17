import { FormAction, stopSubmit, StopSubmitAction } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import {
  AuthAPI,
  ResultCodeEnum,
  ResultCodeForCaptcha,
  securityAPI,
} from '../api/api';
import { AppStateType } from './redux-store';

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
  action: ActionsTypes
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

type ActionsTypes = setUserDataActionType | setCaptureUrlActionType;
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

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;
type ThunkLoginType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes | FormAction
>;
export const makelogin = (): ThunkType => async (dispatch) => {
  let data = await AuthAPI.authme();
  if (data.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(setUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkLoginType => {
  return async (dispatch) => {
    let data = await AuthAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(makelogin());
    } else {
      if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptureURL());
      }
      let message =
        data.messages.length > 0 ? data.messages[0] : 'Email or pass is wrong';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };
};
export const logout = (): ThunkType => {
  return async (dispatch) => {
    let data = await AuthAPI.logout();
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(setUserData(null, null, null, false));
    }
  };
};
export const getCaptureURL = (): ThunkType => {
  return async (dispatch) => {
    let url = await securityAPI.getCaptchaURL();
    dispatch(setCaptureUrl(url));
  };
};
export default authReducer;
