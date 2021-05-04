import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Logo from '../../assets/images/logo_200x200.png';

const Header = ({ logout, isAuth, login }) => {
  return (
    <header className={s.header}>
      <img src={Logo} alt="" />

      <div className={s.loginBlock}>
        {isAuth ? (
          <>
            <div>{login}</div>
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
