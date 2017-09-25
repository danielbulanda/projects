import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SmoothLine } from 'react-native-pathjs-charts';

class Plot extends Component {
  render() {
    const regionStyling = {
      labelOffset: {
        left: 35,
        top: 25,
      },
      fillOpacity: 0.1
    };

    const options = {
      width: 280,
      height: 200,
      color: '#227711',
      margin: {
        top: 5,
        left: 40,
        bottom: 5,
        right: 20
      },
      animate: {
        type: 'delayed',
        duration: 800
      },
      axisX: {
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        color: '#000000',
        label: {
          fontFamily: 'monospace',
          fontSize: 11,
          fill: '#000000',
          bold: false,
          color: '#555555'
        }
      },
      min: (Math.min(...this.props.raw) - 10) > 0
        ? (Math.min(...this.props.raw) - 10)
        : 0,
      max: Math.max(...this.props.raw) + (0.02 * Math.max(...this.props.raw)),
      axisY: {
        showAxis: false,
        showLines: false,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'monospace',
          fontSize: 13,
          fill: '#000000',
          bold: false,
          color: '#555555'
        }
      }
    };

    return (
      <View style={styles.container}>
        <SmoothLine
          data={this.props.data}
          options={options}
          regions={this.props.regions}
          regionStyling={regionStyling} xKey='x' yKey='y'
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export { Plot };
