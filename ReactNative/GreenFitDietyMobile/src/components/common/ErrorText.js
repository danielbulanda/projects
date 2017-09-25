import React from 'react';
import { Text } from 'react-native';

const ErrorText = (props) => {
  return (
    <Text style={styles.errorTextStyle}>
      {props.children}
    </Text>
  );
};

const styles = {
  errorTextStyle: {
    fontSize: 16,
    fontFamily: 'Exo2-Light',
    alignSelf: 'center',
    color: '#e63900',
    marginBottom: 8,
    paddingHorizontal: 8
  }
};

export { ErrorText };
