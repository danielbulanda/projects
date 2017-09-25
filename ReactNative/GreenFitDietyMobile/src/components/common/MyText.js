import React from 'react';
import { Text } from 'react-native';

const MyText = (props) => {
  const bold = props.bold ? { fontFamily: 'Exo2-Medium' } : { fontFamily: 'Exo2-Light' };
  const color = props.color ? { color: props.color } : { color: '#000' };
  const size = props.size ? { fontSize: props.size } : { fontSize: 17 };
  return (
    <Text
      style={[
        styles.textStyle,
        bold, color, size,
        props.style
      ]}
    >
      {props.children}
    </Text>
  );
};

const styles = {
  textStyle: {
    paddingVertical: 6,
    lineHeight: 17,
    textAlign: 'center'
  }
};

export { MyText };
