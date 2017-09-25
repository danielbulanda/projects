import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAZJQXnhWRq5M4bRw6bn1eJSjB-kLB5ZPs',
      authDomain: 'auth-55849.firebaseapp.com',
      databaseURL: 'https://auth-55849.firebaseio.com',
      projectId: 'auth-55849',
      storageBucket: 'auth-55849.appspot.com',
      messagingSenderId: '72767632620'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  contentRender() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Logout
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={{ height: 105 }}>
        <Header headerText='Authentication' />
        {this.contentRender()}
      </View>
    );
  }
}

export default App;
