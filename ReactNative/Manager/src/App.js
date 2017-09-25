import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBEMRyXkMsSEAcYCNUVHs-Of33nYcQmNPY',
      authDomain: 'manager-f3674.firebaseapp.com',
      databaseURL: 'https://manager-f3674.firebaseio.com',
      projectId: 'manager-f3674',
      storageBucket: 'manager-f3674.appspot.com',
      messagingSenderId: '622151138273'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Router />
      </Provider>
    );
  }
}

export default App;
