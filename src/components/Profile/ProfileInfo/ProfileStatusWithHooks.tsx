import React, { useEffect, useState } from 'react';

type PropsType = {
  status: string;
  isOwner: boolean;
  updateUserStatus: (status: string) => void;
};
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.currentTarget.value;
    setStatus(text);
  };
  const activateEditMode = () => {
    if (props.isOwner) {
      setEditMode(true);
    }
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };
  const Enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      deactivateEditMode();
    }
  };
  return (
    <>
      {!editMode ? (
        <div>
          <b>Статус: </b>
          <span onDoubleClick={activateEditMode}>{status || '😊'}</span>
        </div>
      ) : (
        <div>
          <input
            value={status}
            autoFocus={true}
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
            onKeyPress={Enter}></input>
        </div>
      )}
    </>
  );
};

export default ProfileStatusWithHooks;
