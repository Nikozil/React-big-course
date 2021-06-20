const SEND_MESSAGE = 'learningReact/messages/SEND-MESSAGE';

type DialogType = {
  id: number;
  name: string;
  ava: string;
};
type MessagesType = {
  id: number;
  message: string;
};

let initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Dima',
      ava: 'https://cs7.pikabu.ru/post_img/big/2018/10/20/9/154004999513599819.jpg',
    },
    {
      id: 2,
      name: 'Andrey',
      ava: 'https://streamdps.ru/upload/iblock/ba4/ba43a8bf5b491168b4f74e9922c88c25.jpg',
    },
    {
      id: 3,
      name: 'Ivan',
      ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS-dGRrKfrY7Ra3VW3N9WtF9RziY4P_95ECQ&usqp=CAU',
    },
    {
      id: 4,
      name: 'Petr',
      ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7wIM1l36lND_jsEwki3UCnRpcTzs-AfPv-A&usqp=CAU',
    },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'HI HI' },
    { id: 3, message: 'OLOLO' },
  ] as Array<MessagesType>,
};

export type initialStateType = typeof initialState;

const messagesReducer = (
  state: initialStateType = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let newBody = {
        id: 7,
        message: action.newMessageBody,
      };

      return {
        ...state,
        messages: [...state.messages, newBody],
      };
    }
    default:
      return state;
  }
};

export default messagesReducer;

type sendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageCreator = (
  text: string
): sendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody: text,
});
