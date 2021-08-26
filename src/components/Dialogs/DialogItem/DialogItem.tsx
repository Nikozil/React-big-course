import { Tag } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DialogType, startChatting } from '../../../Redax/messages-reducer';
import AvatarComponent from '../../commons/Avatar/Avatar';
import s from '../Dialogs.module.css';

type PropsType = {
  owner: DialogType;
};

const DialogItem: React.FC<PropsType> = ({ owner }) => {
  const dispatch = useDispatch();
  const StartChattingHandler = () => {
    dispatch(startChatting(owner.id));
  };

  let path = '/dialogs/' + owner.id;
  return (
    <div className={s.dialog} onClick={() => StartChattingHandler()}>
      <AvatarComponent
        owner={owner}
        size={'small'}
        className={s.avatar}
        defaultSize={45}
      />
      <div className={s.userName}>{owner.userName}</div>
      {owner.newMessagesCount != 0 && (
        <div className={s.counter}>
          <Tag color="#2db7f5">{owner.newMessagesCount}</Tag>
        </div>
      )}

      {/* <NavLink to={path}>{props.name}</NavLink> */}
    </div>
  );
};

export default DialogItem;
