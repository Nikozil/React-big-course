import { Dispatch } from 'react';
import { chatAPI, ChatMessageType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { v1 } from 'uuid';

export type StatusType = 'pending' | 'ready' | 'error';

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};
export type initialStateType = typeof initialState;

const chatReducer = (
  state: initialStateType = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'learningReact/chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.map((m) => ({ ...m, id: v1() })),
        ].filter((m, i, a) => i >= a.length - 100),
      };
    case 'learningReact/chat/MESSAGES_CLEAR':
      return {
        ...state,
        messages: [],
      };
    case 'learningReact/chat/SET_CHANGED':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;
const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'learningReact/chat/MESSAGES_RECEIVED',
      payload: messages,
    } as const),
  messagesClear: () =>
    ({
      type: 'learningReact/chat/MESSAGES_CLEAR',
    } as const),
  setStatusChanged: (status: StatusType) =>
    ({
      type: 'learningReact/chat/SET_CHANGED',
      payload: status,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;
let _newMessageHandler: ((message: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_newMessageHandler === null)
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };

  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_statusChangedHandler === null)
    _statusChangedHandler = (status) => {
      dispatch(actions.setStatusChanged(status));
    };

  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', newMessageHandlerCreator(dispatch));
  chatAPI.stop();
  dispatch(actions.messagesClear());
};
export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;
