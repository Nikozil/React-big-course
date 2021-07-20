import { instance, UsersAPIType, SuccessRequestType } from './api';

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
