import axios from 'axios';
import { PhotosType, UserType } from '../types/Types';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '07e23d7b-759c-422a-9cb5-3be9351de7c8',
  },
});

export type UsersAPIType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
  fieldsErrors?: Array<string>;
};

export type SuccessRequestType = ResponseType;

export type savePhotoType = ResponseType<{
  photos: PhotosType;
}>;

export type MeResourceType = ResponseType<{
  id: number;
  email: string;
  login: string;
}>;
export type LoginResourceType = ResponseType<
  { userId: number },
  ResultCodeEnum | ResultCodeForCaptcha
>;
export type LogoutResourceType = ResponseType;

export type securityAPIType = {
  url: string;
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}
