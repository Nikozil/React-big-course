import React, { ChangeEvent, KeyboardEvent } from 'react';

type PropsType = {
  status: string;
  updateUserStatus: (newStatus: string) => void;
};
type StateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };
  Enter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.deactivateEditMode();
    }
  };
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    let text = e.currentTarget.value;
    this.setState({ status: text });
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateUserStatus(this.state.status);
  };
  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }
  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.state.status || '😊'}
            </span>
          </div>
        ) : (
          <div>
            <input
              value={this.state.status}
              autoFocus={true}
              onChange={this.onStatusChange}
              onBlur={this.deactivateEditMode}
              onKeyPress={this.Enter}></input>
          </div>
        )}
      </>
    );
  }
}

export default ProfileStatus;
