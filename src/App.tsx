import React from 'react';
import { connect, Provider } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './assets/Preloaders/Preloader';
import { initializeAPP } from './Redax/app-reducer';
import { makelogin } from './Redax/auth-reduser';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { withSuspense } from './hoc/withSuspense';
import store, { AppStateType } from './Redax/redux-store';

const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer')
);
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';

const SuspendedDialog = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

type mapStateToPropsType = {
  initialized: boolean;
};
type mapDispatchToPropsType = {
  initializeAPP: () => void;
  makelogin: () => void;
};

class App extends React.Component<
  mapStateToPropsType & mapDispatchToPropsType
> {
  catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert('Some error occured');
    console.log(promiseRejectionEvent);
  };
  componentDidMount() {
    this.props.initializeAPP();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.catchAllUnhandledErrors
    );
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
            <Route path="/dialogs" render={() => <SuspendedDialog />} />
            <Route
              path="/profile/:userId?"
              render={() => <SuspendedProfile />}
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

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  initialized: state.app.initialized,
});
type ownPropsType = {};
let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    ownPropsType,
    AppStateType
  >(mapStateToProps, { makelogin, initializeAPP })
)(App);

const MainApp: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
export default MainApp;
