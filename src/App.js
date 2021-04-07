import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';

import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { makelogin } from '../src/Redax/auth-reduser';
import { compose } from 'redux';
import { initializeAPP } from '../src/Redax/app-reducer';
import Preloader from '../src/assets/images/Preloader.gif';
class App extends React.Component {
  componentDidMount() {
    this.props.initializeAPP();
  }
  render() {
    if (!this.props.initialized) {
      return <img src={Preloader} />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />

          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/login" component={Login} />
          <Route path="/users" render={() => <UsersContainer />} />

          <Route path="/settings" component={Settings} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { makelogin, initializeAPP })
)(App);
