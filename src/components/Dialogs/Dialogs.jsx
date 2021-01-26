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
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <DialogItem name="Dima" id="1" />
        <DialogItem name="Andrey" id="2" />
        <DialogItem name="Ivan" id="3" />
        <DialogItem name="Petr" id="4" />
      </div>
      <div className={s.messages}>
        <Message message="Hi" />
        <Message message="HI HI" />
        <Message message="OLOLO" />
      </div>
    </div>
  );
};

export default Dialogs;
