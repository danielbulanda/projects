import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection } from './';

const Button = (props) => {
  return (
    <CardSection style={[styles.buttonContainerStyle, props.style]}>
      <Icon.Button
        name={props.name}
        backgroundColor={props.color}
        onPress={props.onPress}
        {...iconStyles}
      >
        <Text style={[styles.buttonTextStyle, props.textStyle]}>{props.text}</Text>
      </Icon.Button>
    </CardSection>
  );
};

const styles = {
  buttonContainerStyle: {
    paddingTop: 5,
    minWidth: '100%'
  },
  buttonTextStyle: {
    fontSize: 16,
    fontFamily: 'Exo2-Light',
    color: '#fff'
  }
};

const iconStyles = {
    borderRadius: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    minWidth: '80%'
};

export { Button };
