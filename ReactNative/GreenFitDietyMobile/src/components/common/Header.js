import React from 'react';
import { Text } from 'react-native';

const Header = () => {
  return (
      <Text style={styles.headerTitleStyle}>Studio
        <Text style={[styles.headerTitleStyle, { color: '#005500' }]}>
          &nbsp;Green
          <Text style={[styles.headerTitleStyle, { color: '#000' }]}>
            Fit
          </Text>
        </Text>
        &nbsp;Diety
      </Text>
  );
};

const styles = {
  headerTitleStyle: {
    fontSize: 19,
    fontFamily: 'Exo2-Medium',
    color: '#000',
    elevation: 5,
    alignSelf: 'center'
  },
};

export { Header };
