const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Dima',
      ava:
        'https://cs7.pikabu.ru/post_img/big/2018/10/20/9/154004999513599819.jpg',
    },
    {
      id: 2,
      name: 'Andrey',
      ava:
        'https://streamdps.ru/upload/iblock/ba4/ba43a8bf5b491168b4f74e9922c88c25.jpg',
    },
    {
      id: 3,
      name: 'Ivan',
      ava:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS-dGRrKfrY7Ra3VW3N9WtF9RziY4P_95ECQ&usqp=CAU',
    },
    {
      id: 4,
      name: 'Petr',
      ava:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7wIM1l36lND_jsEwki3UCnRpcTzs-AfPv-A&usqp=CAU',
    },
  ],
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'HI HI' },
    { id: 3, message: 'OLOLO' },
  ],
  newMessageBody: '1111111',
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;

      break;

    case SEND_MESSAGE:
      let newBody = {
        id: 6,
        message: state.newMessageBody,
      };
      state.messages.push(newBody);
      state.newMessageBody = '';

      break;
    default:
      break;
  }

  return state;
};

export default messagesReducer;

export const sendMessageCreator = () => ({
  type: SEND_MESSAGE,
});

export const UpdateNewMessageBodyCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: text,
});
