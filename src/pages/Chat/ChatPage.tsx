import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ChatMessageType } from '../../api/chat-api';
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../Redax/chat-reducer';
import { AppStateType } from '../../Redax/redux-store';
import s from './ChatPage.module.css';
import { Menu, Dropdown, Button, Space } from 'antd';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { setTimeout } from 'timers';
import { BiMessageRounded, BiWinkSmile } from 'react-icons/bi';
import { List, Typography, Divider, Skeleton } from 'antd';

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
const Chat: React.FC = () => {
  const status = useSelector((state: AppStateType) => state.chat.status);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);
  return (
    <div>
      <div>
        {status == 'ready' ? (
          <BiMessageRounded style={{ fontSize: '20px', color: 'green' }} />
        ) : status == 'pending' ? (
          <BiMessageRounded style={{ fontSize: '20px', color: '#fdd835' }} />
        ) : (
          <BiMessageRounded style={{ fontSize: '20px', color: 'red' }} />
        )}
      </div>
      {status === 'error' && (
        <div>Some error occured. Please refresh the page</div>
      )}

      <Messages />
      <AddMessageForm />
    </div>
  );
};
const Messages: React.FC = () => {
  const messageAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(element.scrollHeight - element.scrollTop) -
        element.clientHeight <
      300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
      console.log('scrolled');
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  const scrollToBottom = () => {
    if (isAutoScroll) {
      setTimeout(() => {
        messageAnchorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 100);
    }
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className={s.messages} id={'messages'} onScroll={scrollHandler}>
      {messages.map((m: any, index) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messageAnchorRef}></div>
    </div>
  );
};
const Message: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    return (
      <div className={s.message}>
        <NavLink to={`/profile/${message.userId}`}>
          <img src={message.photo} alt="" />
        </NavLink>
        <div className={s.messageContent}>
          <div>
            <b>{message.userName}</b>
          </div>
          <div>{message.message}</div>
        </div>
      </div>
    );
  }
);
const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const status = useSelector((state: AppStateType) => state.chat.status);

  const dispatch = useDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  const setEmojiHandler = (emoji: any, event: any) => {
    setMessage(message + emoji.native);
  };
  const menu = (
    <Menu>
      <Picker
        include={['people']}
        onClick={setEmojiHandler}
        title={'Выбери smile'}
        emojiTooltip={false}
        showSkinTones={false}
        emoji={'smiley'}
      />
    </Menu>
  );
  return (
    <div>
      <div className={s.textport}>
        <Space direction="horizontal">
          <textarea
            onKeyPress={(event) => {
              if (event.ctrlKey) setMessage(message + '\n');
              if (event.key === 'Enter') sendMessageHandler();
            }}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}></textarea>{' '}
          <Dropdown overlay={menu} placement="bottomLeft">
            <BiWinkSmile style={{ fontSize: '50px', cursor: 'pointer' }} />
          </Dropdown>
        </Space>
      </div>

      <div>
        <Button disabled={status === 'pending'} onClick={sendMessageHandler}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
