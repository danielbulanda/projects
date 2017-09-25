import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 0,
    borderColor: '#bbb',
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    width: '100%'
  }
};

export { CardSection };
