import { StatusType } from '../Redax/chat-reducer';

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

const subscribers = {
  'message-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};
type EventsNamesType = 'message-received' | 'status-changed';
let ws: WebSocket | null = null;

const setMessagesHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['message-received'].forEach((s) => s(newMessages));
};
const closeHandler = () => {
  console.log('close ws');
  notifySubscribersAboutStatus('pending');

  setTimeout(createChannel, 3000);
};
const openHandler = () => {
  console.log('open ws');
  notifySubscribersAboutStatus('ready');
};
const errorHandler = () => {
  console.error('error ws');
  notifySubscribersAboutStatus('error');
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', setMessagesHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
  ws?.close();
};
const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status));
};
function createChannel() {
  cleanUp();

  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  );
  notifySubscribersAboutStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', setMessagesHandler);
  ws.addEventListener('open', openHandler);
  ws.addEventListener('error', errorHandler);
}

export const chatAPI = {
  subscribe(
    EventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribers[EventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[EventName] = subscribers[EventName].filter(
        //@ts-ignore
        (s) => s !== callback
      );
    };
  },
  unsubscribe(
    EventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribers[EventName] = subscribers[EventName].filter(
      //@ts-ignore

      (s) => s !== callback
    );
  },

  sendMessage(message: string) {
    ws?.send(message);
  },
  start() {
    createChannel();
  },
  stop() {
    subscribers['message-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
  },
};
export type ChatMessageType = ChatMessageAPIType & { id: string };
export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
