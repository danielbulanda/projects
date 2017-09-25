import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection } from './';

const ButtonMenu = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <CardSection style={[styles.buttonContainerStyle, props.style]}>
        <Icon.Button
          name={props.name}
          backgroundColor={'rgba(255,255,255,0.1)'}
          onPress={props.onPress}
          color={props.color}
          {...iconStyles}
        >
          <Text style={[styles.buttonTextStyle, props.textStyle]}>{props.text}</Text>
        </Icon.Button>
      </CardSection>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  buttonContainerStyle: {
    paddingTop: 0,
    minWidth: '100%',
    justifyContent: 'flex-end'
  },
  buttonTextStyle: {
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: 'Exo2-Light',
    color: '#000'
  }
};

const iconStyles = {
    borderRadius: 0,
    paddingVertical: 12,
    paddingLeft: 12,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    minWidth: '88%',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#111',
    opacity: 0.9
};

export { ButtonMenu };
