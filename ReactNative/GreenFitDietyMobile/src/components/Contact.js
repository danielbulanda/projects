import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { email, phonecall, web, text } from 'react-native-communications';
import { Card, CardSection, Button } from './common';

class Contact extends Component {

  renderWeb() {
    if (this.props.web) {
      return (
        <View>
          <Text style={styles.contactTextStyle}>
            Zapraszamy do odwiedzenia naszej strony www z możliwością rezerwacji wizyty online:
          </Text>
          <Button
            name='ravelry'
            color="#3b5998"
            onPress={() => web('http://greenfitdiety.pl')}
            text="greenfitdiety.pl"
          />
        </View>
      );
    }
  }

  render() {
    const title = this.props.title ? this.props.title : 'Problemy z logowaniem?';
    const textBody = this.props.text ? this.props.text
      : 'Nie możesz się zalogować lub nie jesteś naszym klientem? Skontaktuj się z nami:\n';
    const titleColor = this.props.titleColor ? this.props.titleColor : '#999900';
    return (
      <View style={styles.containerStyle}>
        <Card title={title} headerColor={titleColor}>
          <CardSection style={{ flexDirection: 'column' }}>

            <Text style={styles.contactTextStyle}>{textBody}</Text>
            <Button
              name='comments-o'
              color="#739900"
              onPress={() => text('+48500126496', null)}
              text="SMS: 500-126-496"
            />
            <Button
              name='phone'
              color="#4d9900"
              onPress={() => phonecall('+48500126496', true)}
              text="500-126-496"
            />
            <Button
              name='envelope-open-o'
              color="#339966"
              onPress={() =>
                email(['ula.bulanda92@gmail.com'], null, null, null, null)}
              text="ula.bulanda92@gmail.com"
            />
            {this.renderWeb()}

          </CardSection>
          <CardSection />
        </Card>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginVertical: 5
  },
  contactTextStyle: {
    fontSize: 16,
    fontFamily: 'Exo2-Light',
    color: '#000',
    padding: 8,
    textAlign: 'center'
  }
};

export default Contact;
