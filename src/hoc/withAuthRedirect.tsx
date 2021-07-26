import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../Redax/redux-store';

export const withAuthRedirect = <WCP,>(Component: React.ComponentType<WCP>) => {
  type mapStateToPropsType = { isAuth: boolean };
  let mapStateToPropsRedirect = (state: AppStateType): mapStateToPropsType => {
    return {
      isAuth: state.auth.isAuth,
    };
  };
  const RedirectComponent: React.FC<mapStateToPropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    if (!props.isAuth) {
      return <Redirect to={'/login'} />;
    }
    return <Component {...(restProps as WCP)} />;
  };

  let ConnectRedirectComponent = connect<
    mapStateToPropsType,
    {},
    {},
    AppStateType
  >(
    mapStateToPropsRedirect,
    {}
  )(RedirectComponent);
  return ConnectRedirectComponent;
};
