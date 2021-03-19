import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
  sendMessageCreator,
  UpdateNewMessageBodyCreator,
} from '../../Redax/messages-reduse';
import Dialogs from './Dialogs';

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

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirectComponent);

export default DialogsContainer;
