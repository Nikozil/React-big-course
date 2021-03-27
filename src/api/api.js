import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '07e23d7b-759c-422a-9cb5-3be9351de7c8',
  },
});

export const UsersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id) {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },
  unfollow(id) {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
};
export const ProfileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  setStatus(status) {
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => response.data);
  },
};
export const AuthAPI = {
  authme() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  login(email, password, rememberMe = false) {
    return instance
      .post(`/auth/login`, { email, password, rememberMe })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`/auth/login`).then((response) => response.data);
  },
  security() {
    return instance
      .get(`/security/get-captcha-url`)
      .then((response) => response.data.url);
  },
};
