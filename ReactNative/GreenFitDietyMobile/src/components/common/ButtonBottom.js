import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

const ButtonBottom = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[buttonStyle, style]}>
        <Text style={textStyle}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Exo2-Medium',
    fontSize: 16,
    paddingVertical: 10
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#338013',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0
  }
};

export { ButtonBottom };
