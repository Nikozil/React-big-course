import { FormAction, stopSubmit, StopSubmitAction } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { ResultCodeEnum, ResultCodeForCaptcha } from '../api/api';
import { securityAPI } from '../api/security-api';
import { AuthAPI } from '../api/auth-api';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';

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
    case 'learningReact/auth/SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'learningReact/auth/SET_CAPTURE_URL':
      return {
        ...state,
        captureULR: action.url,
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;
const actions = {
  setUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'learningReact/auth/SET_USER_DATA',
      payload: { userId, email, login, isAuth },
    } as const),
  setCaptureUrl: (url: string) =>
    ({
      type: 'learningReact/auth/SET_CAPTURE_URL',
      url: url,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;
type ThunkLoginType = BaseThunkType<ActionsTypes | FormAction>;
export const makelogin = (): ThunkType => async (dispatch) => {
  let data = await AuthAPI.authme();
  if (data.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(actions.setUserData(id, email, login, true));
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
      dispatch(actions.setUserData(null, null, null, false));
    }
  };
};
export const getCaptureURL = (): ThunkType => {
  return async (dispatch) => {
    let url = await securityAPI.getCaptchaURL();
    dispatch(actions.setCaptureUrl(url));
  };
};
export default authReducer;
