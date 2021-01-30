import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Dialogs';

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {props.messagesData.dialogs.map((i) => (
          <DialogItem name={i.name} id={i.id} src={i.ava} />
        ))}
      </div>
      <div className={s.messages}>
        {props.messagesData.messages.map((i) => (
          <Message id={i.id} message={i.message} />
        ))}
      </div>
    </div>
  );
};

export default Dialogs;
