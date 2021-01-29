import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <div className={s.dialog + ' ' + s.active}>
      <NavLink to={path}>{props.name}</NavLink>{' '}
    </div>
  );
};

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

const Dialogs = () => {
  let dialogsData = [
    { id: 1, name: 'Dima' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Ivan' },
    { id: 4, name: 'Petr' },
  ];
  let messagesData = [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'HI HI' },
    { id: 3, message: 'OLOLO' },
  ];

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsData.map((i) => (
          <DialogItem name={i.name} id={i.id} />
        ))}
      </div>
      <div className={s.messages}>
        {messagesData.map((i) => (
          <Message message={i.message} />
        ))}
      </div>
    </div>
  );
};

export default Dialogs;
