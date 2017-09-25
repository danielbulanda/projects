import React, { Component } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { email, web } from 'react-native-communications';
import * as Animatable from 'react-native-animatable';
import { Card, CardSection, MyText, Button } from './common';

class About extends Component {

  state = { vis: false };

  componentWillMount() {
     Actions.refresh({ key: 'drawer', open: false });
  }

  onAccept() {
    this.setState({ vis: false });
  }

  onDecline() {
    this.setState({ vis: false });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <Animatable.View
            animation="bounceIn"
            iterationCount={1}
            direction="alternate"
            duration={800}
            ref="view"
          >
            <Card title="Informacje o aplikacji">
              <CardSection style={{ flexDirection: 'column' }}>
                <MyText size={19} color="#003300" bold>GreenFit Diety Mobile</MyText>
                <MyText size={14} style={{ marginBottom: 12 }}>wersja 1.0.0</MyText>
                <MyText size={15} style={{ paddingVertical: 0 }}>Created by</MyText>
                <MyText>Daniel Bulanda</MyText>
                <Button
                  name='envelope-open-o'
                  color="#339966"
                  onPress={() =>
                    email(['kontakt@danielbulanda.pl'], null, null, null, null)}
                  text="kontakt@danielbulanda.pl"
                />
              </CardSection>
              <CardSection />
            </Card>
            <Card title="Oceń aplikację">
              <CardSection style={{ flexDirection: 'column' }}>
                <Button
                  name='star-o'
                  color="#3b5998"
                  onPress={() => web('https://play.google.com/store')}
                  text="Oceń w Play Store"
                />
              </CardSection>
              <CardSection />
            </Card>
            <Card title="Notification">
              <CardSection style={{ flexDirection: 'column' }}>
                <Button
                  name='star-o'
                  color="#3b5998"
                  onPress={() => {
                    let date = new Date(Date.now() + (1000));
                    if (Platform.OS === 'ios') {
                      date = date.toISOString();
                    }
                    PushNotification.localNotificationSchedule({
                      title: 'GreenFit Diety',
                      message: 'Śniadanie',
                      bigText: 'Jabka \nŚliwki \nAnanasy',
                      ongoing: true,
                      actions: '["Yes", "No"]',
                      repeatType: 'time',
                      repeatTime: 4000,
                      date,
                    });
                  }}
                  text="Wyślij"
                />
                <Button
                  name='star-o'
                  color="#3b5998"
                  onPress={() => {
                    PushNotification.cancelAllLocalNotifications();
                  }}
                  text="Anuluj"
                />
              </CardSection>
              <CardSection />
            </Card>
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    marginVertical: 5,
    paddingTop: 40
  },
  dietDescriptionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '82%'
  },
  dietDescriptionTextStyle: {
    lineHeight: 20
  }
};

const mapStateToProps = ({ auth }) => {
  const { changes } = auth.user;
  return { changes };
};

export default connect(mapStateToProps, { })(About);
