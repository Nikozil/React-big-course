import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
  console.log(props.login);
  return (
    <header className={s.header}>
      <img
        src="https://www.freelogodesign.org/file/app/client/thumb/057f09d3-897d-4814-8f9d-0915951c62c6_200x200.png?1611427072505"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>{props.login}</div>
        ) : (
          <NavLink to={`/login`}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
