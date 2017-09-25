import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from './';

const Card = (props) => {
  const headerColor = props.headerColor ? props.headerColor : '#338013';
  return (
    <View style={[styles.containerStyle, props.style]}>
      <CardSection style={{ paddingVertical: 0, borderBottomWidth: 0 }}>
        <Text
          style={[styles.cardHeaderStyle, { backgroundColor: headerColor }]}
        >
          {props.title}
        </Text>
      </CardSection>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 0,
    borderRadius: 7,
    borderColor: '#275929',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 5,
    padding: 0,
    backgroundColor: '#eeeeee',
    alignItems: 'center'
  },
  cardHeaderStyle: {
    fontSize: 16,
    fontFamily: 'Exo2-Light',
    color: '#fff',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#338013',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    textAlign: 'center',
    paddingVertical: 3,
    marginBottom: 8
  }
};

export { Card };
