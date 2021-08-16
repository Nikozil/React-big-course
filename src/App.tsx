import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { connect, Provider } from 'react-redux';
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './assets/Preloaders/Preloader';
import HeaderAPP from './components/Header/Header';
import { Login } from './components/Login/Login';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersPage from './components/Users/UsersPage';
import { withSuspense } from './hoc/withSuspense';
import { initializeAPP } from './Redax/app-reducer';
import { makelogin } from './Redax/auth-reducer';
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
    const { Content, Sider } = Layout;
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}>
        <HeaderAPP />

        <Content style={{ padding: '0 50px' }}>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0 0 0', minHeight: '93vh' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu mode="inline" style={{ height: '100%' }}>
                <Menu.Item key="1">
                  <NavLink to="/profile">Profile</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/dialogs">Messages</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/users">Users</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/news">News</NavLink>
                </Menu.Item>

                <Menu.Item key="5">
                  <NavLink to="/music">Music</NavLink>
                </Menu.Item>
                <Menu.Item key="6">
                  <NavLink to="/settings">Settings</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
                minWidth: '500px',
                // minHeight: '77vh',
              }}>
              <Switch>
                <Route path="/dialogs" render={() => <SuspendedDialog />} />
                <Route
                  path="/profile/:userId?"
                  render={() => <SuspendedProfile />}
                />
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={'/profile'} />}
                />

                <Route path="/news" component={News} />
                <Route path="/music" component={Music} />
                <Route path="/login" component={Login} />
                <Route
                  path="/users"
                  render={() => <UsersPage pageTitle={'Пользователи'} />}
                />

                <Route path="/settings" component={Settings} />
                <Route
                  path="*"
                  exact={true}
                  render={() => (
                    <>
                      {' '}
                      <div>404 NOT FOUND</div>
                    </>
                  )}
                />
              </Switch>
            </Content>
          </Layout>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}></Footer> */}
      </Layout>
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
