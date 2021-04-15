import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '07e23d7b-759c-422a-9cb5-3be9351de7c8',
  },
});

export const UsersAPI = {
  async getUsers(currentPage, pageSize) {
    let response = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },
  async follow(id) {
    let response = await instance.post(`follow/${id}`);
    return response.data;
  },
  async unfollow(id) {
    let response = await instance.delete(`follow/${id}`);
    return response.data;
  },
};
export const ProfileAPI = {
  async getProfile(userId) {
    let response = await instance.get(`profile/${userId}`);
    return response.data;
  },
  async getStatus(userId) {
    let response = await instance.get(`profile/status/${userId}`);
    return response.data;
  },
  async setStatus(status) {
    let response = await instance.put(`profile/status`, { status: status });
    return response.data;
  },
};
export const AuthAPI = {
  async authme() {
    let response = await instance.get(`auth/me`);
    return response.data;
  },

  async login(email, password, rememberMe = false) {
    let response = await instance.post(`/auth/login`, {
      email,
      password,
      rememberMe,
    });
    return response.data;
  },
  async logout() {
    let response = await instance.delete(`/auth/login`);
    return response.data;
  },
  async security() {
    let response = await instance.get(`/security/get-captcha-url`);
    return response.data.url;
  },
};
