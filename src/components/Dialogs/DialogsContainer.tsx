import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
  DialogType,
  MessagesType,
  sendMessageCreator,
} from '../../Redax/messages-reduse';
import { AppStateType } from '../../Redax/redux-store';
import Dialogs from './Dialogs';

type MapStatePropsType = {
  dialogs: Array<DialogType>;
  messages: Array<MessagesType>;
};

type MapDispatchPropsType = {
  sendMessage: (message: string) => void;
};
type OwnPropsType = {
  newMessageBody: string;
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
    // newMessageBody: state.messagesPage.newMessageBody,
  };
};
let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    sendMessage: (text) => {
      dispatch(sendMessageCreator(text));
    },
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthRedirect
)(Dialogs);
