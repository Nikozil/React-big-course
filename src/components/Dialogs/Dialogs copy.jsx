import React from 'react';
import {
  sendMessageCreator,
  UpdateNewMessageBodyCreator,
} from '../../Redax/messages-reduse';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  let newMessage = React.createRef();

  let sendMessage = (event) => {
    props.dispatch(sendMessageCreator());
  };
  let onMessageChange = () => {
    let text = newMessage.current.value;

    props.dispatch(UpdateNewMessageBodyCreator(text));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {props.messagesData.dialogs.map((i) => (
          <DialogItem name={i.name} id={i.id} src={i.ava} />
        ))}
      </div>
      <div className={s.messages}>
        <div>
          {props.messagesData.messages.map((i) => (
            <Message id={i.id} message={i.message} />
          ))}
        </div>

        <div className={s.addMessage}>
          <div>
            <textarea
              value={props.messagesData.newMessageBody}
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
