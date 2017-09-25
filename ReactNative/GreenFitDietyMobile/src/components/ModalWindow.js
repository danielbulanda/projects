import React, { Component } from 'react';
import { View, Modal, Text, Switch, TouchableWithoutFeedback } from 'react-native';
import SharedPreferences from 'react-native-shared-preferences';
import { ButtonBottom, MyText, CardSection } from './common';

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: this.readNotificationPreferences()
    };
  }

  readNotificationPreferences() {
    SharedPreferences.getItem('notifications', value => {
      switch (value) {
        case 'true':
          this.setState({ notifications: true }); break;
        case 'false':
          this.setState({ notifications: false }); break;
        default:
          this.setState({ notifications: true }); break;
      }
    });
  }

  render() {
    const { dismissModal, logout } = this.props;
    const { containerStyle } = styles;
    return (
      <Modal
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={containerStyle}>
          <CardSection style={{ paddingVertical: 0, borderBottomWidth: 0 }}>
            <Text
              style={styles.cardHeaderStyle}
            >
              Ustawienia
            </Text>
          </CardSection>
          <CardSection style={{ flexDirection: 'column' }}>
            <View style={styles.settingsItemStyle}>
              <MyText size={15}>johhanan@tlen.pl</MyText>
              <TouchableWithoutFeedback
                onPress={() => {
                  dismissModal();
                  setTimeout(
                    () => { logout(); },
                    100
                  );
                }}
              >
                <View style={{ paddingTop: 7 }}>
                  <Text style={{ fontFamily: 'Exo2-Medium', color: '#004d3d', fontSize: 15 }}>
                    Wyloguj
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <View style={styles.settingsItemStyle}>
              <MyText size={15}>Powiadomienia</MyText>
              <Switch
                value={this.state.notifications}
                onValueChange={value => {
                  const bool = value ? 'true' : 'false';
                  SharedPreferences.setItem('notifications', bool);
                  this.setState({ notifications: value });
                }}
                // onTintColor="#dae1f1"
                // tintColor="#3b5998"
              />
            </View>
          </CardSection>
          <CardSection style={{ paddingBottom: 0 }}>
            <ButtonBottom
              onPress={dismissModal}
              style={{ backgroundColor: '#3b5998', marginTop: 5 }}
            >
              Zapisz
            </ButtonBottom>
          </CardSection>
        </View>
      </Modal>
    );
  }
}

const styles = {
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 10
  },
  containerStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    width: '95%',
    alignSelf: 'center',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 0,
    alignItems: 'center'
  },
  cardHeaderStyle: {
    fontSize: 16,
    fontFamily: 'Exo2-Light',
    color: '#fff',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    textAlign: 'center',
    paddingVertical: 3,
    marginBottom: 8
  },
  settingsItemStyle: {
    justifyContent: 'space-between',
    width: '80%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 2,
    marginBottom: 8
  }
};

export default ModalWindow;
