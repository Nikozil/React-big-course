import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Dialogs';

const Dialogs = (props) => {
  let newMessage = React.createRef();
  let addMessage = (event) => {
    let text = newMessage.current.value;
    alert(text);
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
              ref={newMessage}
              onKeyPress={(event) => {
                if (event.key === 'Enter') addMessage();
              }}></textarea>
          </div>
          <button onClick={addMessage}>Add Message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
