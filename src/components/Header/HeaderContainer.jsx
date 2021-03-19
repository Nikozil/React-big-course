import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setUserData, makelogin } from '../../Redax/auth-reduser';
import Header from './Header';
import { UsersAPI } from '../../api/api';

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.makelogin();
  }
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { setUserData, makelogin })(
  HeaderContainer
);
