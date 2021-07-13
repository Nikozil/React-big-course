import React from 'react';
import s from '../Dialogs.module.css';

type PropsType = {
  id: number;
  message: string;
};

const Message: React.FC<PropsType> = (props) => {
  let style = [s.message];

  if (props.id % 2 === 0) style.push(s.right);
  return <div className={style.join(' ')}>{props.message}</div>;
};

export default Message;
