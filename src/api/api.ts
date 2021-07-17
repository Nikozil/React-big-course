import axios, { AxiosResponse } from 'axios';
import { ProfileType, UserType } from '../types/Types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '07e23d7b-759c-422a-9cb5-3be9351de7c8',
  },
});

type UsersAPIType = {
  items: Array<UserType>;
  totalCount: number;
  error: string;
};
type SuccessRequestType = {
  data: Object;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: ResultCodeEnum;
};

export const UsersAPI = {
  async getUsers(currentPage: number = 1, pageSize: number = 10) {
    let response = await instance.get<UsersAPIType>(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },
  async follow(id: number) {
    let response = await instance.post<SuccessRequestType>(`follow/${id}`);
    return response.data;
  },
  async unfollow(id: number) {
    let response = await instance.delete<SuccessRequestType>(`follow/${id}`);
    return response.data;
  },
};

type savePhotoType = {
  data: { photos: { small: string; large: string } };
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: ResultCodeEnum;
};

export const ProfileAPI = {
  async getProfile(userId: number) {
    let response = await instance.get<ProfileType>(`profile/${userId}`);
    return response.data;
  },
  async getStatus(userId: number) {
    let response = await instance.get<string>(`profile/status/${userId}`);
    return response.data;
  },
  async setStatus(status: string) {
    let response = await instance.put<SuccessRequestType>(`profile/status`, {
      status: status,
    });
    return response.data;
  },
  async savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('image', photoFile);
    let response = await instance.put<savePhotoType>(
      `/profile/photo`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },
  async saveProfile(profile: ProfileType) {
    let response = await instance.put<SuccessRequestType>(`profile/`, profile);
    return response.data;
  },
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

type MeResourceType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};
type LoginResourceType = {
  data: { userId: number };
  resultCode: ResultCodeEnum | ResultCodeForCaptcha;
  messages: Array<string>;
};
type LogoutResourceType = {
  data: {};
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};
export const AuthAPI = {
  async authme() {
    let response = await instance.get<MeResourceType>(`auth/me`);
    return response.data;
  },

  async login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null
  ) {
    let response = await instance.post<LoginResourceType>(`/auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return response.data;
  },
  async logout() {
    let response = await instance.delete<LogoutResourceType>(`/auth/login`);
    return response.data;
  },
};

type securityAPIType = {
  url: string;
};
export const securityAPI = {
  async getCaptchaURL() {
    let response = await instance.get<securityAPIType>(
      `/security/get-captcha-url`
    );
    return response.data.url;
  },
};
