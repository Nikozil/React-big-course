import React from 'react';
import { Field, Form } from 'react-final-form';
import { TextArea } from '../commons/FormControls/FormsControls';
import {
  composeValidators,
  maxLengthCreator,
  required,
} from '../utils/validators/validates';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  let sendMessage = (message) => {
    console.log(message);
    props.sendMessage(message);
  };

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
          <DialogForm sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};
const DialogForm = (props) => {
  return (
    <div>
      <Form
        onSubmit={(MessageData) => {
          props.sendMessage(MessageData.message);
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="message"
                validate={composeValidators(required, maxLengthCreator(100))}
                component={TextArea}
                type="text"
                placeholder="Enter your message"></Field>
            </div>
            <button type="submit">Add Message</button>
          </form>
        )}
      />
    </div>
  );
};

export default Dialogs;
