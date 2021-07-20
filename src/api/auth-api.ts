import {
  instance,
  MeResourceType,
  LoginResourceType,
  LogoutResourceType,
} from './api';

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
