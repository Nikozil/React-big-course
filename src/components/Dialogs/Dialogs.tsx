import React from 'react';
import { Field, Form } from 'react-final-form';
import { DialogType, MessagesType } from '../../Redax/messages-reducer';
import {
  composeValidators,
  maxLengthCreator,
  required,
} from '../../utils/validators/validates';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

type DialogsPropsType = {
  message: string;

  dialogs: Array<DialogType>;
  messages: Array<MessagesType>;

  sendMessage: (message: string) => void;
};

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  let sendMessage = (message: string) => {
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

type DialogFormPropsType = {
  sendMessage: (message: string) => void;
};

const DialogForm: React.FC<DialogFormPropsType> = (props) => {
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
                component="textarea"
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
