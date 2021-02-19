import React from 'react';
import s from '../Dialogs.module.css';

const Message = (props) => {
  let style = [s.message];

  if (props.id % 2 === 0) style.push(s.right);
  return <div className={style.join(' ')}>{props.message}</div>;
};

export default Message;
