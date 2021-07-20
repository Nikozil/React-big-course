import { ProfileType } from '../types/Types';
import { instance, SuccessRequestType, savePhotoType } from './api';

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
