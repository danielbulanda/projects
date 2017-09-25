import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Card, CardSection, Plot, MyText, DashedTexts } from './common';
import { changeChanged } from '../actions';

class Changes extends Component {

  componentWillMount() {
     Actions.refresh({ key: 'drawer', open: false });
  }

  setNumberForChange() {
    switch (this.props.change) {
      case 'weight':
        return 0;
      case 'bmi':
        return 1;
      case 'metabolic_age':
        return 2;
      case 'fat':
        return 3;
      case 'visceral_fat':
        return 4;
      default:
        return null;
    }
  }
  setChangeName(position) {
    switch (position) {
      case 0:
        return 'weight';
      case 1:
        return 'bmi';
      case 2:
        return 'metabolic_age';
      case 3:
        return 'fat';
      case 4:
        return 'visceral_fat';
      default:
        return null;
    }
  }

  setUnit() {
    switch (this.props.change) {
      case 'weight':
        return 'kg';
      case 'fat':
        return '%';
      case 'metabolic_age':
        return 'lat';
      case 'visceral_fat':
        return '%';
      default:
        return '';
    }
  }

  setColor(type, value) {
    switch (type) {
      case 'weight':
        return value > this.props.user.height - 90
          || value < this.props.user.height - 110
          ? '#e60000' : '#196619';
      case 'bmi':
        return value > 25 || value < 18.5 ? '#e60000' : '#196619';
      case 'metabolic_age':
        return value > this.props.user.age
          ? '#e60000' : '#196619';
      case 'fat':
        return value > 30 || value < 10 ? '#e60000' : '#196619';
      case 'visceral_fat':
        return value > 5 ? '#e60000' : '#196619';
      default:
        return '#000';
    }
  }

  singleData(type) {
    const filtered = this.prepareData().filter(change => {
      console.log(change);
      return eval(`change.${type} != null`);
    });
    return filtered.map(change => {
      console.log(change);
      return eval(`change.${type}`);
    });
  }

  filterData(type) {
    const filtered = this.prepareData().filter(change => {
      console.log(change);
      return eval(`change.${type} != null`);
    });
    return filtered.map((change) => {
      return { x: Date.parse(change.date), y: eval(`change.${type}`) };
    });
  }

  createRegions(type) {
    const color = '#007700';
    switch (type) {
      case 'weight':
        return [{
          from: this.props.user.height - 110,
          to: this.props.user.height - 90,
          fill: color
        }];
      case 'bmi':
        return [{
          from: 18.5,
          to: 25,
          fill: color
        }];
      case 'metabolic_age':
        return [{
          from: 0,
          to: this.props.user.age,
          fill: color
        }];
      case 'fat':
        return [{
          from: 10,
          to: 30,
          fill: color
        }];
      case 'visceral_fat':
        return [{
          from: 0,
          to: 5,
          fill: color
        }];
      default:
        return [{}];
    }
  }

  prepareData() {
    const sorted = this.props.changes.sort((a, b) => a.date.localeCompare(b.date));
    return sorted.map(item => {
        let bmi;
        if (item.weight == null || this.props.user.height == null) {
          bmi = null;
        } else {
          bmi = (item.weight / Math.pow(this.props.user.height / 100, 2)).toFixed(0);
        }
        return { ...item, bmi };
     });
  }

  renderPlot(data) {
    const start = this.singleData(this.props.change)[0];
    const now = this.singleData(this.props.change)[this.singleData(this.props.change).length - 1];
    const min = Math.min(...this.singleData(this.props.change));
    const max = Math.max(...this.singleData(this.props.change));

    if (data.length > 1) {
      return (
        <View style={{ alignItems: 'center', width: '100%' }}>
        <CardSection>
          <Plot
            data={[data]}
            raw={this.singleData(this.props.change)}
            age={this.props.user.age}
            height={this.props.user.height}
            regions={this.createRegions(this.props.change)}
          />
        </CardSection>
        <CardSection style={styles.plotDateStye}>
          <MyText size={15}>{this.singleData('date')[0]}</MyText>
          <MyText size={15}>
            {this.singleData('date')[this.singleData('date').length - 1]}
          </MyText>
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <DashedTexts color="#555">
            <MyText color="#000" size={16}>Start</MyText>
            <MyText bold color={this.setColor(this.props.change, start)} size={16}>
              {start} {this.setUnit()}
            </MyText>
          </DashedTexts>
          <DashedTexts color="#555">
            <MyText color="#000" size={16}>Minimum</MyText>
            <MyText bold color={this.setColor(this.props.change, min)} size={16}>
              {min} {this.setUnit()}
            </MyText>
          </DashedTexts>
          <DashedTexts color="#555">
            <MyText color="#000" size={16}>Maksimum</MyText>
            <MyText bold color={this.setColor(this.props.change, max)} size={16}>
              {max} {this.setUnit()}
            </MyText>
          </DashedTexts>
          <DashedTexts color="#555">
            <MyText color="#000" size={16}>Obecnie</MyText>
            <MyText bold color={this.setColor(this.props.change, now)} size={16}>
              {now} {this.setUnit()}
            </MyText>
          </DashedTexts>
        </CardSection>
        </View>
      );
    } else if (data.length === 1) {
      return (
        <CardSection style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
          <MyText>Dostępny jest tylko jeden pomiar:</MyText>
          <DashedTexts color="#555">
            <MyText color="#000" size={16}>{this.singleData('date')[0]}</MyText>
            <MyText bold size={16} color={this.setColor(this.props.change, data[0].y)}>
              {data[0].y} {this.setUnit()}
            </MyText>
          </DashedTexts>
          <View style={{ width: '82%', marginTop: 10 }}>
          <MyText size={15}>
            Wykres pojawi się automatycznie po kolejnej wizycie w gabinecie
          </MyText>
          </View>
        </CardSection>
      );
    }
    return (
      <View style={{ marginVertical: 12, alignItems: 'center' }}>
        <MyText>Brak danych</MyText>
        <MyText size={15}>Wykres pojawi się automatycznie po kolejnych wizytach w gabinecie</MyText>
      </View>
    );
  }

  renderPicker() {
    const params = [
      'Masa ciała [kg]',
      'Body Mass Index',
      'Wiek metaboliczny',
      'Tuszcz całkowity [%]',
      'Tłuszcz trzewny [%]'
    ];
    return (
      <WheelPicker
        onItemSelected={({ position }) => {
          const change = (this.setChangeName(position));
          this.props.changeChanged(change);
          this.refs.plot.bounceIn(800);
        }}
        selectedItemPosition={this.setNumberForChange()}
        isCurved
        isCyclic
        isAtmospheric
        selectedItemTextColor="#293d29"
        itemTextColor="#7b9d7b"
        visibleItemCount={7}
        data={params}
        renderIndicator={false}
        itemTextFontFamily="Exo2-Light"
        itemTextSize={52}
        indicatorColor="#c3dcc3"
        style={{ width: 220, height: 138 }}
      />
    );
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
            <Card title="Sprawdź przebieg kuracji">
              <CardSection style={{ flexDirection: 'column', paddingVertical: 0 }}>
                {this.renderPicker()}

                {/* <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Picker
                    style={{ minWidth: 188, height: 35 }}
                    selectedValue={this.props.change}
                    prompt="Wybierz parametr"
                    onValueChange={value => {
                      this.props.changeChanged(value);
                      Actions.changes({ type: ActionConst.REFRESH });
                      // this.refs.view.bounceIn(800);
                    }}
                  >
                    <Picker.Item label="Masa ciała [kg]" value="weight" />
                    <Picker.Item label="Body Mass Index" value="bmi" />
                    <Picker.Item label="Wiek metaboliczny" value="metabolic_age" />
                    <Picker.Item label="Tuszcz całkowity [%]" value="fat" />
                    <Picker.Item label="Tłuszcz trzewny [%]" value="visceral_fat" />
                  </Picker>
                </View> */}
              </CardSection>
              <Animatable.View
                animation="bounceIn"
                iterationCount={1}
                direction="alternate"
                duration={800}
                ref="plot"
                style={{ alignItems: 'center', width: '100%' }}
              >
                {this.renderPlot(this.filterData(this.props.change))}
              </Animatable.View>
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
  plotDateStye: {
    width: 280,
    marginLeft: 20,
    justifyContent: 'space-between'
  }
};

const mapStateToProps = ({ auth, main }) => {
  const { changes, user } = auth.user;
  const { change } = main;
  return { changes, change, user };
};

export default connect(mapStateToProps, { changeChanged })(Changes);
