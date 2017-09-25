import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import logo from '../../assets/img/logo.png';
import { ButtonMenu } from './common';
import { dayChanged, sectionChanged } from '../actions';

class SideMenu extends Component {

  getCurrentDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const now = new Date();
    return days[now.getDay()];
  }

  render() {
    return (
      <ScrollView style={styles.containerStyle}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={logo}
            style={styles.logoStyle}
          />

            <ButtonMenu
              name="eercast"
              color={this.props.section === 'diet' ? '#196619' : '#000'}
              onPress={() => {
                this.props.dayChanged(this.getCurrentDay());
                this.props.sectionChanged('diet');
                Actions.diet({ type: ActionConst.RESET });
              }}
              text="Dieta na dziś"
              textStyle={{ color: this.props.section === 'diet' ? '#196619' : '#000' }}
              style={styles.menuItemStyle}
            />
            <ButtonMenu
              name="user-o"
              color={this.props.section === 'profile' ? '#196619' : '#000'}
              onPress={() => {
                this.props.sectionChanged('profile');
                Actions.profile({ type: ActionConst.RESET });
              }}
              text="Twój Profil"
              textStyle={{ color: this.props.section === 'profile' ? '#196619' : '#000' }}
              style={styles.menuItemStyle}
            />
            <ButtonMenu
              name="line-chart"
              color={this.props.section === 'changes' ? '#196619' : '#000'}
              onPress={() => {
                this.props.sectionChanged('changes');
                Actions.changes({ type: ActionConst.RESET });
              }}
              text="Przebieg kuracji"
              textStyle={{ color: this.props.section === 'changes' ? '#196619' : '#000' }}
              style={styles.menuItemStyle}
            />
            <ButtonMenu
              name="envelope-open-o"
              color={this.props.section === 'contact' ? '#196619' : '#000'}
              onPress={() => {
                this.props.sectionChanged('contact');
                Actions.contact({ type: ActionConst.RESET });
              }}
              text="Kontakt"
              textStyle={{ color: this.props.section === 'contact' ? '#196619' : '#000' }}
              style={styles.menuItemStyle}
            />
            <ButtonMenu
              name="info-circle"
              color={this.props.section === 'about' ? '#196619' : '#000'}
              onPress={() => {
                this.props.sectionChanged('about');
                Actions.about({ type: ActionConst.RESET });
              }}
              text="O aplikacji"
              textStyle={{ color: this.props.section === 'about' ? '#196619' : '#000' }}
              style={styles.menuItemStyle}
            />

        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7
  },
  logoStyle: {
    width: '70%',
    resizeMode: 'contain',
    position: 'relative',
    borderTopRightRadius: 7
  },
  menuItemStyle: {
    marginVertical: 4,
    opacity: 0.9
  }
};

const mapStateToProps = ({ main }) => {
  const { section } = main;
  return { section };
};

export default connect(mapStateToProps, { dayChanged, sectionChanged })(SideMenu);
