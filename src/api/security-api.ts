import { instance, securityAPIType } from './api';

export const securityAPI = {
  async getCaptchaURL() {
    let response = await instance.get<securityAPIType>(
      `/security/get-captcha-url`
    );
    return response.data.url;
  },
};
