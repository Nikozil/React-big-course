import { error } from 'console';
import { DialogsAPI } from '../api/dialogs-api';
import { PhotosType } from '../types/Types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

export type DialogType = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: PhotosType;
};

export type MessageType = {
  id: string;
  body: string;
  translatedBody: null | string;
  addedAt: string;
  senderId: number;
  senderName: string;
  recipientId: number;
  viewed: boolean;
};
export type MessagesType = {
  items: Array<MessageType>;
  totalCount: number;
  error: string | null;
};

let initialState = {
  dialogs: [
    {
      id: 1,
      userName: 'Dima',
      photos: {
        small:
          'https://cs7.pikabu.ru/post_img/big/2018/10/20/9/154004999513599819.jpg',
        large: null,
      },
    },
  ] as Array<DialogType>,
  messages: {
    items: [
      {
        id: 'a9ab74c9-2dcf-4833-9618-f285c2568eea',
        body: 'Hi',
        translatedBody: null,
        addedAt: '2021-08-26T11:46:13.943',
        senderId: 1,
        senderName: 'Dima',
        recipientId: 2,
        viewed: false,
      },
    ],
    totalCount: 1,
    error: null,
  } as MessagesType | null,
  newMessageCount: 0,
};
export type initialStateType = typeof initialState;

const messagesReducer = (
  state: initialStateType = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'learningReact/messages/SET_COUNT': {
      return {
        ...state,
        newMessageCount: action.payload,
      };
    }
    case 'learningReact/messages/SET_DIALOGS': {
      return {
        ...state,
        dialogs: [...action.payload],
      };
    }
    case 'learningReact/messages/SET_MESSAGES': {
      return {
        ...state,
        messages: {
          ...action.payload,
        },
      };
    }
    case 'learningReact/messages/WIPE_MESSAGES': {
      return {
        ...state,
        messages: null,
      };
    }

    default:
      return state;
  }
};

export default messagesReducer;

export type ActionsTypes = InferActionsTypes<typeof actions>;
export const actions = {
  sendMessageCreator: (text: string) =>
    ({
      type: 'learningReact/messages/SEND-MESSAGE',
      newMessageBody: text,
    } as const),
  setCount: (count: number) =>
    ({
      type: 'learningReact/messages/SET_COUNT',
      payload: count,
    } as const),
  setDialogs: (dialogs: Array<DialogType>) =>
    ({
      type: 'learningReact/messages/SET_DIALOGS',
      payload: dialogs,
    } as const),
  setMessages: (messages: MessagesType) =>
    ({
      type: 'learningReact/messages/SET_MESSAGES',
      payload: messages,
    } as const),
  wipeMessages: () =>
    ({
      type: 'learningReact/messages/WIPE_MESSAGES',
    } as const),
};

//startChatting getDialogs getMessagesFromFriend sendMessage getNewMessagesCount

type ThunkType = BaseThunkType<ActionsTypes>;
export const setCount = (): ThunkType => async (dispatch) => {
  let data = await DialogsAPI.getNewMessagesCount();
  dispatch(actions.setCount(data));
};
export const startChatting =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await DialogsAPI.startChatting(userId);
    dispatch(setDialogs());
  };
export const setDialogs = (): ThunkType => async (dispatch) => {
  let data = await DialogsAPI.getDialogs();
  dispatch(actions.setDialogs(data));
};
export const setMessagesFromFriend =
  (id: number, currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.wipeMessages());
    let data = await DialogsAPI.getMessagesFromFriend(
      id,
      currentPage,
      pageSize
    );

    dispatch(actions.setMessages(data));
  };
export const sendMessage =
  (id: number, message: string): ThunkType =>
  async (dispatch) => {
    let data = await DialogsAPI.sendMessage(id, message);
  };
