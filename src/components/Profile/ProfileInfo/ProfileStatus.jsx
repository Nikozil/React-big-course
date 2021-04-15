import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };
  Enter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.deactivateEditMode();
    }
  };
  onStatusChange = (e) => {
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
  componentDidUpdate(prevProps, prevState) {
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
