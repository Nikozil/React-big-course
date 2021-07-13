import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Dialogs.module.css';

type PropsType = {
  id: number;
  src: string;
  name: string;
};

const DialogItem: React.FC<PropsType> = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <div className={s.dialog + ' ' + s.active}>
      <img src={props.src} alt="" />
      <NavLink to={path}>{props.name}</NavLink>{' '}
    </div>
  );
};

export default DialogItem;
