import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';

import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { makelogin } from '../src/Redax/auth-reduser';
import { compose } from 'redux';
import { initializeAPP } from '../src/Redax/app-reducer';
import Preloader from '../src/assets/Preloaders/Preloader';
import store from './Redax/redux-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert('Some error occured');
    console.log(promiseRejectionEvent);
  };
  componentDidMount() {
    this.props.initializeAPP();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledEr);
  }
  render() {
    if (!this.props.initialized) {
      return (
        <div>
          <Preloader />
          <div>learn react</div>
        </div>
      );
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route
              path="/profile/:userId?"
              render={withSuspense(ProfileContainer)}
            />
            <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/login" component={Login} />
            <Route
              path="/users"
              render={() => <UsersContainer pageTitle={'Пользователи'} />}
            />

            <Route path="/settings" component={Settings} />
            <Route
              path="*"
              exact={true}
              render={() => <div>404 NOT FOUND</div>}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { makelogin, initializeAPP })
)(App);

const MainApp = (props) => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
export default MainApp;
