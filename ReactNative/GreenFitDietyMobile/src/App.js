import React, { Component } from 'react';
import { } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Scene, Router, Modal, Actions, Route } from 'react-native-router-flux';
import { setCustomText, setCustomPicker } from 'react-native-global-props';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Diet from './components/Diet';
import Changes from './components/Changes';
import ContactMain from './components/ContactMain';
import About from './components/About';
import reducers from './reducers';
import { Header } from './components/common';
import NavigationDrawer from './components/NavigationDrawer';
import Settings from './components/Settings';

class App extends Component {

  render() {
    setCustomText(customTextProps);
    setCustomPicker(customTextProps);

    const getSceneStyle = () => {
      const style = {
        backgroundColor: '#000',
      };
      return style;
    };
    const { allScenesStyle, headerStyle } = styles;

    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router sceneStyle={allScenesStyle} getSceneStyle={getSceneStyle}>
          <Scene
            key="drawer"
            component={NavigationDrawer}
            open={false}
          >
            <Scene key="modal" component={Modal}>
              <Scene key="root">
                <Scene key="auth" type="reset">
                  <Scene
                    key="loginScene"
                    component={LoginForm}
                    hideNavBar={false}
                    navigationBarStyle={headerStyle}
                    renderTitle={() => <Header />}
                    initial
                    renderLeftButton={() => {}}
                  />
                </Scene>
                <Scene key="main">

                  <Scene
                     key="diet"
                     component={Diet}
                     navigationBarStyle={headerStyle}
                     renderTitle={() => <Header />}
                     drawerImage={require('../assets/img/drawer.png')}
                     leftButtonStyle={styles.drawerIconStyle}
                     rightButtonImage={require('../assets/img/settings.png')}
                     onRight={() => {
                       Actions.statusModal({ });
                     }}
                     rightButtonStyle={styles.rightIconStyle}
                  />
                  <Scene
                     key="profile"
                     component={Profile}
                     navigationBarStyle={headerStyle}
                     renderTitle={() => <Header />}
                     drawerImage={require('../assets/img/drawer.png')}
                     leftButtonStyle={styles.drawerIconStyle}
                     rightButtonImage={require('../assets/img/settings.png')}
                     onRight={() => {
                       Actions.statusModal({ });
                     }}
                     rightButtonStyle={styles.rightIconStyle}
                  />
                  <Scene
                     key="changes"
                     component={Changes}
                     navigationBarStyle={headerStyle}
                     renderTitle={() => <Header />}
                     drawerImage={require('../assets/img/drawer.png')}
                     leftButtonStyle={styles.drawerIconStyle}
                     rightButtonImage={require('../assets/img/settings.png')}
                     onRight={() => {
                       Actions.statusModal({ });
                     }}
                     rightButtonStyle={styles.rightIconStyle}
                  />
                  <Scene
                     key="contact"
                     component={ContactMain}
                     navigationBarStyle={headerStyle}
                     renderTitle={() => <Header />}
                     drawerImage={require('../assets/img/drawer.png')}
                     leftButtonStyle={styles.drawerIconStyle}
                     rightButtonImage={require('../assets/img/settings.png')}
                     onRight={() => {
                       Actions.statusModal({ });
                     }}
                     rightButtonStyle={styles.rightIconStyle}
                  />
                  <Scene
                     key="about"
                     component={About}
                     navigationBarStyle={headerStyle}
                     renderTitle={() => <Header />}
                     drawerImage={require('../assets/img/drawer.png')}
                     leftButtonStyle={styles.drawerIconStyle}
                     rightButtonImage={require('../assets/img/settings.png')}
                     onRight={() => {
                       Actions.statusModal({ });
                     }}
                     rightButtonStyle={styles.rightIconStyle}
                  />

                </Scene>
              </Scene>
              <Scene key="statusModal" component={Settings} schema="modal" />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = {
  allScenesStyle: {
    backgroundColor: '#000',
    paddingTop: 0
  },
  headerStyle: {
    marginTop: 0,
    backgroundColor: '#cccccc',
    height: 40,
    justifyContent: 'center',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7
  },
  drawerIconStyle: {
    position: 'absolute',
    top: -7,
    left: -82
  },
  rightIconStyle: {
    position: 'absolute',
    top: -7,
    right: -52
  },
  tabBarStyle: {
    paddingTop: 3,
    backgroundColor: '#cccccc',
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  }
};

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: 'Exo2-Light',
    color: 'black'
  }
};

export default App;
