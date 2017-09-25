import React, { Component } from 'react';
import { Image, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import { MyText, Card, CardSection, DashedTexts } from './common';

class Profile extends Component {

  componentWillMount() {
     Actions.refresh({ key: 'drawer', open: false });
  }

  setColor(type, value) {
      if (value == null || value === 'brak danych') {
        return '#000';
      }
      switch (type) {
      case 'weight':
        return value > this.props.user.user.height - 90
          || value < this.props.user.user.height - 110
          ? '#e60000' : '#196619';
      case 'bmi':
        return value > 25 || value < 18.5 ? '#e60000' : '#196619';
      case 'metabolic_age':
        return value > this.props.user.user.age
          ? '#e60000' : '#196619';
      case 'fat':
        return value > 30 || value < 10 ? '#e60000' : '#196619';
      case 'visceral_fat':
        return value > 5 ? '#e60000' : '#196619';
      default:
        return '#000';
    }
  }

  checkProp(type, unit) {
    if (eval(`this.props.user.user.${type} == null`)) {
      return 'brak danych';
    }
    const value = eval(`this.props.user.user.${type}`);
    return value.toString().concat(unit);
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      height
    } = this.props.user.user;

    const changes = this.props.user.changes[this.props.user.changes.length - 1];
    const bmi = this.props.user.user.height && this.props.user.user.weight
      ? (changes.weight / Math.pow(height / 100, 2)).toFixed(2)
      : 'brak danych';

    const name =
      (first_name || last_name)
      ? `${first_name} ${last_name}`
      : email.substring(0, email.lastIndexOf('@'));

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
            <Card title="Twój profil">
              <CardSection style={{ flexDirection: 'column' }}>

                <View style={styles.avatarStyle}>
                  <Image
                    style={{ width: 128, height: 128, borderRadius: 5 }}
                    source={{ uri: `http://10.0.2.2:4000/files/avatars/${email}.png` }}
                  />
                </View>
                <MyText bold size={19} style={{ paddingVertical: 0 }}>{name}</MyText>
                <MyText>{email}</MyText>

                <DashedTexts color="#555">
                  <MyText color="#000" size={16}>Wzrost</MyText>
                  <MyText bold size={16}>{this.checkProp('height', ' cm')}</MyText>
                </DashedTexts>
                <DashedTexts color="#555">
                  <MyText color="#000" size={16}>Wiek</MyText>
                  <MyText bold size={16}>{this.checkProp('age', ' lat')}</MyText>
                </DashedTexts>
                <DashedTexts color="#555">
                  <MyText color="#000" size={16}>
                    Masa ciała
                  </MyText>
                  <MyText bold color={this.setColor('weight', changes.weight)} size={16}>
                    {this.checkProp('weight', ' kg')}
                  </MyText>
                </DashedTexts>
                <DashedTexts color="#555">
                  <MyText color="#000" size={16}>BMI</MyText>
                  <MyText bold color={this.setColor('bmi', bmi)} size={16}>
                    {bmi}
                  </MyText>
                </DashedTexts>
                <DashedTexts color="#555">
                  <MyText color="#000" size={16}>
                    Wiek metaboliczny
                  </MyText>
                  <MyText
                    bold
                    color={this.setColor('metabolic_age', changes.metabolic_age)}
                    size={16}
                  >
                    {this.checkProp('metabolic_age', ' lat')}
                  </MyText>
                </DashedTexts>
                <DashedTexts color="#555">
                  <MyText color="#000" size={16}>
                    Body Fat
                  </MyText>
                  <MyText bold color={this.setColor('fat', changes.fat)} size={16}>
                    {this.checkProp('fat', ' %')}
                  </MyText>
                </DashedTexts>
                <DashedTexts color="#555">
                  <MyText color="#000" size={16}>
                    Tłuszcz trzewny
                  </MyText>
                  <MyText
                    bold
                    color={this.setColor('visceral_fat', changes.visceral_fat)}
                    size={16}
                  >
                    {this.checkProp('visceral_fat', ' %')}
                  </MyText>
                </DashedTexts>

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
  avatarStyle: {
    width: 128,
    height: 128,
    borderWidth: 0,
    borderRadius: 8,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 15,
    marginTop: 5
  },
  containerStyle: {
    marginVertical: 5,
    paddingTop: 40
  }
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps, {})(Profile);
