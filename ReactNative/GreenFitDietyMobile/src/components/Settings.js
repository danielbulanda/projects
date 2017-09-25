import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ModalWindow from './ModalWindow';
import { signOut } from '../actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.dismissModal = this.dismissModal.bind(this);
  }

  dismissModal() {
    this.setState({ vis: false });
    Actions.pop();
  }

  render() {
    return (
      <ModalWindow
        logout={this.props.signOut}
        dismissModal={this.dismissModal}
      />
    );
  }
}

export default connect(null, { signOut })(Settings);
