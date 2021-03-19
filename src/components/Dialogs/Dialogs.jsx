import React from 'react';
import { Redirect } from 'react-router';

import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  let newMessage = React.createRef();

  let sendMessage = () => {
    props.sendMessage();
  };
  let onMessageChange = () => {
    let text = newMessage.current.value;

    props.onMessageChange(text);
  };
  if (props.isAuth == false) {
    return <Redirect to={'/login'} />;
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {props.dialogs.map((i) => (
          <DialogItem name={i.name} key={i.id} id={i.id} src={i.ava} />
        ))}
      </div>
      <div className={s.messages}>
        <div>
          {props.messages.map((i) => (
            <Message id={i.id} key={i.id} message={i.message} />
          ))}
        </div>

        <div className={s.addMessage}>
          <div>
            <textarea
              value={props.newMessageBody}
              ref={newMessage}
              onChange={onMessageChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') sendMessage();
              }}></textarea>
          </div>
          <button onClick={sendMessage}>Add Message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
