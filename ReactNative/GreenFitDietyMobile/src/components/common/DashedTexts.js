import React from 'react';
import Dash from 'react-native-dash';
import { CardSection } from './';

const DashedTexts = (props) => {
  const color = props.color ? props.color : '#6f931f';
  return (
    <CardSection style={styles.containerStyle}>
      <CardSection style={styles.innerContanierStyle}>
        {props.children}
      </CardSection>
      <Dash
        style={{ width: '100%', paddingHorizontal: 0 }}
        dashThickness={1}
        dashColor={color}
        dashLength={2}
        dashGap={0}
      />
    </CardSection>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '82%',
    marginVertical: 2
  },
  innerContanierStyle: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 0
  }
};

export { DashedTexts };
