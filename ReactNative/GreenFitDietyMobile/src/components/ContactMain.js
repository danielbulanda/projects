import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import openMap from 'react-native-open-maps';
import * as Animatable from 'react-native-animatable';
import Contact from './Contact';
import { Card, MyText, CardSection, Button } from './common';

class ContactMain extends Component {

  componentWillMount() {
     Actions.refresh({ key: 'drawer', open: false });
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
            <Contact
              title="Kontakt"
              text="W razie jakichkolwiek pytań lub problemów z
                działaniem aplikacji skontaktuj się z nami:"
              titleColor="#338013"
              web
            />
            <Card title="Gabinet">
              <CardSection style={{ flexDirection: 'column' }}>
                <MyText bold size={18} style={{ marginBottom: 8 }}>
                  Godziny otwarcia:
                </MyText>
                <View style={styles.scheduleStye}>
                  <MyText>Poniedziałek</MyText><MyText> 9:00-14:00</MyText>
                </View>
                <View style={styles.scheduleStye}>
                  <MyText>Wtorek</MyText><MyText> 14:00-19:00</MyText>
                </View>
                <View style={styles.scheduleStye}>
                  <MyText>Środa</MyText><MyText> 9:00-14:00</MyText>
                </View>
                <View style={styles.scheduleStye}>
                  <MyText>Czwartek</MyText><MyText> 14:00-19:00</MyText>
                </View>
                <View style={styles.scheduleStye}>
                  <MyText>Piątek</MyText><MyText> 14:00-19:00</MyText>
                </View>
            </CardSection>
            <CardSection style={{ flexDirection: 'column', marginTop: 8 }}>
              <MyText>
                Znajdziesz nas na:
              </MyText>
              <MyText bold>
                ul. Mitkowskiego 4
              </MyText>
              <MyText>
                30-337 Kraków
              </MyText>
              <MyText style={{ marginBottom: 8 }}>
                Wejście przez Gabinety Lekarskie USG
              </MyText>
              <Button
                name='map-marker'
                color="#008080"
                onPress={() =>
                  openMap({ latitude: 50.046444, longitude: 19.926688 })}
                text="Pokaż na mapie"
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
  },
  scheduleStye: {
    width: '70%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
};

const mapStateToProps = ({ auth }) => {
  const { changes } = auth.user;
  return { changes };
};

export default connect(mapStateToProps, { })(ContactMain);
