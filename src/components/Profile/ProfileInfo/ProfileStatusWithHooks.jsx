import React, { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const onStatusChange = (e) => {
    let text = e.currentTarget.value;
    setStatus(text);
  };
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };
  const Enter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      deactivateEditMode();
    }
  };
  return (
    <>
      {!editMode ? (
        <div>
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
