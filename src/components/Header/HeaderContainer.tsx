import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../Redax/auth-reducer';
import { AppStateType } from '../../Redax/redux-store';
import Header, { PropsType } from './Header';

type mapStatePropsType = {
  isAuth: boolean;
  login: null | string;
};
type mapDispatchToPropsType = {
  logout: () => void;
};
type ownPropsType = {};

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: AppStateType): mapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect<
  mapStatePropsType,
  mapDispatchToPropsType,
  ownPropsType,
  AppStateType
>(mapStateToProps, { logout })(HeaderContainer);
