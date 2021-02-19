import React from 'react';
import { connect } from 'react-redux';
import {
  sendMessageCreator,
  UpdateNewMessageBodyCreator,
} from '../../Redax/messages-reduse';
import Dialogs from './Dialogs';

// const DialogsContainer = (props) => {
//   let messagesData = props.appStore.getState().messagesPage;
//   let dispatch = props.appStore.dispatch.bind(props.appStore);
//   let sendMessage = () => {
//     dispatch(sendMessageCreator());
//   };
//   let onMessageChange = (text) => {
//     dispatch(UpdateNewMessageBodyCreator(text));
//   };

//   return (
//     <Dialogs
//       sendMessage={sendMessage}
//       onMessageChange={onMessageChange}
//       dialogs={messagesData.dialogs}
//       messages={messagesData.messages}
//       newMessageBody={messagesData.newMessageBody}
//     />
//   );
// };

let mapStateToProps = (state) => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
    newMessageBody: state.messagesPage.newMessageBody,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    onMessageChange: (text) => {
      dispatch(UpdateNewMessageBodyCreator(text));
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
