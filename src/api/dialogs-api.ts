import { DialogType } from '../Redax/messages-reducer';
import { FilterType } from '../Redax/users-reducer';
import { instance, UsersAPIType, SuccessRequestType } from './api';

export type DialogsAPIType = {
  dialogs: {};
};

export const DialogsAPI = {
  async getDialogs() {
    let response = await instance.get<Array<DialogType>>(`/dialogs`);
    return response.data;
  },
  // getDialogs response [{"id":19273,"userName":"antaresss","hasNewMessages":false,"lastDialogActivityDate":"2021-08-24T17:23:20.87","lastUserActivityDate":"2021-08-24T17:12:07.967","newMessagesCount":0,"photos":{"small":null,"large":null}}]
  async startChatting(userId: number) {
    let response = await instance.put<SuccessRequestType>(`dialogs/${userId}`);
    return response.data;
  },
  //startChatting response {"data":{},"messages":[],"fieldsErrors":[],"resultCode":0}
  async getMessagesFromFriend<DialogsAPIType>(
    id: number,
    currentPage: number,
    pageSize: number
  ) {
    let response = await instance.get<DialogsAPIType>(
      `/dialogs/${id}/messages?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },
  //getMessagesFromFriend {"items":[{"id":"a9ab74c9-2dcf-4833-9618-f285c2568eea","body":"1","translatedBody":null,"addedAt":"2021-08-26T11:46:13.943","senderId":15421,"senderName":"Darius","recipientId":19273,"viewed":false},{"id":"d9935c72-afbe-4af1-aabb-7860769fca5e","body":"test","translatedBody":null,"addedAt":"2021-08-26T11:46:34.14","senderId":15421,"senderName":"Darius","recipientId":19273,"viewed":false}],"totalCount":2,"error":null}
  async sendMessage(id: number, message: string) {
    let response = await instance.post<DialogsAPIType>(
      `dialogs/${id}/messages`,
      { body: message }
    );
    return response.data;
  },
  //{"data":{"message":{"id":"d9935c72-afbe-4af1-aabb-7860769fca5e","body":"test","translatedBody":null,"addedAt":"2021-08-26T11:46:34.14","senderId":15421,"senderName":"Darius","recipientId":19273,"recipientName":"antaresss","viewed":false,"deletedBySender":false,"deletedByRecipient":false,"isSpam":false,"distributionId":null}},"messages":[],"fieldsErrors":[],"resultCode":0}
  async getViewed(messageId: number) {
    let response = await instance.get<DialogsAPIType>(
      `/dialogs/messages/${messageId}/viewed`
    );
    return response.data;
  },
  async postSpam(messageId: number) {
    let response = await instance.post<DialogsAPIType>(
      `/dialogs/messages/${messageId}/spam`
    );
    return response.data;
  },
  async deleteMessage(messageId: number) {
    let response = await instance.delete<DialogsAPIType>(
      `dialogs/messages/${messageId}/`
    );
    return response.data;
  },
  async putRestore(messageId: number) {
    let response = await instance.put<DialogsAPIType>(
      `/dialogs/messages/${messageId}/restore`
    );
    return response.data;
  },
  async getNewestMessage(userId: number, date: string) {
    let response = await instance.get<DialogsAPIType>(
      `/dialogs/${userId}/messages/new?newerThen=${date}`
    );
    return response.data;
  },
  async getNewMessagesCount() {
    let response = await instance.get<number>(`dialogs/messages/new/count`);
    return response.data;
  },
};
