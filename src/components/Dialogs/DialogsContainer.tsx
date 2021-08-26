import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
  DialogType,
  MessageType,
  actions,
  ActionsTypes,
} from '../../Redax/messages-reducer';
import { AppStateType } from '../../Redax/redux-store';
import Dialogs from './Dialogs';

type MapStatePropsType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
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
    messages: state.messagesPage.messages.items,
  };
};
let mapDispatchToProps = (
  dispatch: Dispatch<ActionsTypes>
): MapDispatchPropsType => {
  return {
    sendMessage: (text) => {
      dispatch(actions.sendMessageCreator(text));
    },
  };
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthRedirect
)(Dialogs);
