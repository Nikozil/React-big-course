import React from 'react';
import { MessageType } from '../../../Redax/messages-reducer';
import s from '../Dialogs.module.css';
import { IoMdCheckmark } from 'react-icons/io';
const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  let style = [s.message];
  const sanitizer = require('sanitizer');
  return (
    <div>
      {/* {message.addedAt} */}
      <b>{message.senderName}</b>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizer.sanitize(message.body) }}
      />
      {message.viewed ? (
        <IoMdCheckmark style={{ color: 'green' }} />
      ) : (
        <IoMdCheckmark />
      )}
      <span style={{ float: 'right' }}>
        {message.addedAt.match(/\d\d:\d\d/i)}{' '}
      </span>
      <hr />
    </div>
  );
};

export default Message;
