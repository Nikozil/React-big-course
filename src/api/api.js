import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '07e23d7b-759c-422a-9cb5-3be9351de7c8',
  },
});
const getUsers = (currentPage, pageSize) => {
  return instance
    .get(`users?page=${currentPage}&count=${pageSize}`)
    .then((response) => response.data);
};
const postUsers = (id) => {
  return instance.post(`follow/${id}`).then((response) => response.data);
};
const deleteUsers = (id) => {
  return instance.delete(`follow/${id}`).then((response) => response.data);
};

const getProfile = (userId) => {
  return instance.get(`profile/${userId}`).then((response) => response.data);
};

export const UsersAPI = { getUsers, postUsers, deleteUsers, getProfile };
