import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Logo from '../../assets/images/logo_200x200.png';

const Header = (props) => {
  let logout = () => {
    props.logout();
  };
  return (
    <header className={s.header}>
      <img src={Logo} alt="" />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <>
            <div>{props.login}</div>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink to={`/login`}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
