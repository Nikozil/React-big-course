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
};

const messagesReducer = (state = initialState, action) => {
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

export const sendMessageCreator = (text) => ({
  type: SEND_MESSAGE,
  newMessageBody: text,
});
