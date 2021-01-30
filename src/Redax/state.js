import React from 'react';

let state = {
  profilePage: {
    posts: [
      { id: 1, message: 'Hi, how are your?', likesCount: 2 },
      { id: 2, message: "It's my first", likesCount: 3 },
      { id: 3, message: 'olololo', likesCount: 20 },
    ],
  },
  messagesPage: {
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
  },
};

export default state;
