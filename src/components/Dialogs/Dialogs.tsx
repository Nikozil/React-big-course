import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import {
  DialogType,
  MessagesType,
  MessageType,
  sendMessage,
  setDialogs,
  setMessagesFromFriend,
  startChatting,
} from '../../Redax/messages-reducer';
import {
  composeValidators,
  maxLengthCreator,
  required,
} from '../../utils/validators/validates';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type DialogsPropsType = {
  message: string;

  dialogs: Array<DialogType>;
  messages: MessagesType;

  sendMessage: (message: string) => void;
};

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const [id, setId] = useState('');
  const dialogID = props.dialogs[0].id;
  let sendMessage = (message: string) => {
    props.sendMessage(message);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDialogs());
  }, []);
  useEffect(() => {
    dispatch(setMessagesFromFriend(dialogID, 1, 10));
  }, [props.dialogs]);
  const startChattingWithId = () => {
    dispatch(startChatting(+id));
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {props.dialogs.map((i) => (
            <DialogItem owner={i} key={i.id} />
          ))}
        </div>
        <div className={s.messages}>
          <div>
            {props.messages ? (
              props.messages.items.map((i) => (
                <Message message={i} key={i.id} />
              ))
            ) : (
              <Spin indicator={antIcon} className={s.loader} />
            )}
          </div>
          <div className={s.addMessage}>
            <DialogForm sendMessage={sendMessage} id={dialogID} />
          </div>
        </div>
      </div>
    </div>
  );
};

type DialogFormPropsType = {
  sendMessage: (message: string) => void;
  id: number;
};

const DialogForm: React.FC<DialogFormPropsType> = ({ id }) => {
  const dispatch = useDispatch();
  const sendMessageHandler = (id: number, message: string) => {
    dispatch(sendMessage(id, message));
  };
  return (
    <div>
      <Form
        onSubmit={(MessageData) => {
          sendMessageHandler(id, MessageData.message);
          setTimeout(() => dispatch(setMessagesFromFriend(id, 1, 10)), 100);
          MessageData.message = '';
        }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="message"
                validate={composeValidators(required, maxLengthCreator(100))}
                component="textarea"
                type="text"
                onKeyPress={(event: KeyboardEvent) => {
                  if (event.key === 'Enter') form.submit();
                }}
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
