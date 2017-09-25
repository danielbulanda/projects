import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        selectionColor="#7ab300"
        underlineColorAndroid="#7ab300"
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 20,
    flex: 3,
    fontFamily: 'Exo2-Light'
  },
  labelStyle: {
    fontSize: 16,
    flex: 0,
    fontFamily: 'Exo2-Light',
    color: '#000'
  },
  containerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%'
  }
};

export { Input };
