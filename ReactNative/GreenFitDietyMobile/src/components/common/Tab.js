import React from 'react';
import { Text } from 'react-native';

const Tab = () => {
  return (
    <Text style={styles.errorTextStyle}>
      Tab
    </Text>
  );
};

const styles = {
  errorTextStyle: {
    fontSize: 16,
    fontFamily: 'Exo2-Light',
    alignSelf: 'center',
    color: '#000'
  }
};

export { Tab };
