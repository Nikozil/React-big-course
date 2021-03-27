import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { sendMessageCreator } from '../../Redax/messages-reduse';
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
    sendMessage: (text) => {
      dispatch(sendMessageCreator(text));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
