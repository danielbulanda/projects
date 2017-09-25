import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { WheelPicker } from 'react-native-wheel-picker-android';
import * as Animatable from 'react-native-animatable';
import { MyText, Card, CardSection, DashedTexts } from './common';
import { dayChanged } from '../actions';

class Home extends Component {

  componentWillMount() {
     Actions.refresh({ key: 'drawer', open: false });
  }

  setNumberForDay() {
    switch (this.props.day) {
      case 'monday':
        return 0;
      case 'tuesday':
        return 1;
      case 'wednesday':
        return 2;
      case 'thursday':
        return 3;
      case 'friday':
        return 4;
      case 'saturday':
        return 5;
      case 'sunday':
        return 6;
      default:
        return null;
    }
  }
  setDayName(day) {
    switch (day) {
      case 'Poniedziałek':
        return 'monday';
      case 'Wtorek':
        return 'tuesday';
      case 'Środa':
        return 'wednesday';
      case 'Czwartek':
        return 'thursday';
      case 'Piątek':
        return 'friday';
      case 'Sobota':
        return 'saturday';
      case 'Niedziela':
        return 'sunday';
      case 'monday':
        return 'Poniedziałek';
      case 'tuesday':
        return 'Wtorek';
      case 'wednesday':
        return 'Środa';
      case 'thursday':
        return 'Czwartek';
      case 'friday':
        return 'Piątek';
      case 'saturday':
        return 'Sobota';
      case 'sunday':
        return 'Niedziela';
      default:
        return null;
    }
  }

  setCardName() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const now = new Date();
    if (this.props.day === days[now.getDay()]) {
      return 'Dieta na dziś: '.concat(this.setDayName(this.props.day));
    }
    return this.setDayName(this.props.day);
  }

  renderDiets(day) {
    console.log(day);
    const diets = [];
    for (let i = 1; i <= 7; i++) {
      const name = `m${i}_name`;
      if (eval(`day.${name} !== null`)) {
        diets.push(
          <CardSection style={{ flexDirection: 'column' }} key={eval(`day.${name}`)}>
            <DashedTexts>
              <MyText bold color="#2d6f11" size={18}>{eval(`day.${name}`)}</MyText>
              <MyText size={15}>godzina <MyText bold>{eval(`day.m${i}_time`)}</MyText></MyText>
            </DashedTexts>
            <View style={styles.dietDescriptionStyle}>
              <MyText style={styles.dietDescriptionTextStyle}>
                {eval(`day.m${i}_description`)}
              </MyText>
            </View>
          </CardSection>
        );
      }
    }
    return diets;
  }

  renderEmptyTemplate() {
    if (this.renderDiets(eval(`this.props.diets.${this.props.day}`)).length === 0) {
      return <MyText style={{ marginVertical: 5 }}>Brak danych</MyText>;
    }
    return;
  }

  render() {
    const days = [
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota',
      'Niedziela'
    ];
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <Animatable.View
            animation="bounceIn"
            iterationCount={1}
            direction="alternate"
            duration={800}
            ref="diet"
          >
            <Card title={this.setCardName()}>
              {this.renderDiets(eval(`this.props.diets.${this.props.day}`))}
              {this.renderEmptyTemplate()}
              <CardSection />
            </Card>
            </Animatable.View>
            <Animatable.View
              animation="bounceIn"
              iterationCount={1}
              direction="alternate"
              duration={800}
              ref="picker"
            >
            <Card title="Wybierz dzień diety">
              <CardSection style={{ flexDirection: 'column', paddingVertical: 0 }}>
                <CardSection>
                    <WheelPicker
                      onItemSelected={({ data }) => {
                        const day = (this.setDayName(data));
                        this.props.dayChanged(day);
                        this.refs.diet.bounceIn(800);
                      }}
                      selectedItemPosition={this.setNumberForDay()}
                      isCurved
                      isCyclic
                      isAtmospheric
                      selectedItemTextColor="#293d29"
                      itemTextColor="#7b9d7b"
                      visibleItemCount={7}
                      data={days}
                      renderIndicator={false}
                      itemTextFontFamily="Exo2-Light"
                      itemTextSize={52}
                      indicatorColor="#caccca"
                      style={{ width: '82%', height: 138 }}
                    />
                </CardSection>
                {/* <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Picker
                    style={{ minWidth: 135, height: 35 }}
                    selectedValue={this.props.day}
                    prompt="Wybierz dzień tygodnia"
                    onValueChange={value => {
                      this.props.dayChanged(value);
                      Actions.diet({ type: ActionConst.REFRESH });
                      // this.refs.view.bounceIn(800);
                    }}
                  >
                    <Picker.Item label="Poniedziałek" value="monday" />
                    <Picker.Item label="Wtorek" value="tuesday" />
                    <Picker.Item label="Środa" value="wednesday" />
                    <Picker.Item label="Czwartek" value="thursday" />
                    <Picker.Item label="Piątek" value="friday" />
                    <Picker.Item label="Sobota" value="saturday" />
                    <Picker.Item label="Niedziela" value="sunday" />
                  </Picker>
                 </View> */}
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
    lineHeight: 20,
    textAlign: 'left'
  }
};

const mapStateToProps = ({ auth, main }) => {
  const { diets } = auth.user;
  const { day } = main;
  return { diets, day };
};

export default connect(mapStateToProps, { dayChanged })(Home);
