import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo_200x200.png';
import { logout } from '../../Redax/auth-reducer';
import { getAuth, getLogin } from '../../Redax/auth-selectors';
import s from './Header.module.css';

const HeaderAPP: React.FC = () => {
  const isAuth = useSelector(getAuth);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout);
  };
  return (
    <Header className={s.header} id="header1">
      <Row className={s.row} justify="space-between">
        <Col span={2}>
          <div className={s.logo}>
            <img src={Logo} alt="" />
          </div>
        </Col>

        <Col span={22}>
          <div className={s.loginBlock}>
            {isAuth ? (
              <div>
                <Avatar size="large" icon={<UserOutlined />} />
                <div className={s.login}>{login}</div>
                <Button onClick={logoutHandler}>Logout</Button>
              </div>
            ) : (
              <NavLink to={`/login`}>Login</NavLink>
            )}
          </div>
        </Col>
      </Row>
    </Header>
    // <header className={s.header}>
    //   <img src={Logo} alt="" />

    //   <div className={s.loginBlock}>
    //     {isAuth ? (
    //       <>
    //         <div>{login}</div>
    //         <button onClick={logout}>Logout</button>
    //       </>
    //     ) : (
    //       <NavLink to={`/login`}>Login</NavLink>
    //     )}
    //   </div>
    // </header>
  );
};

export default HeaderAPP;
