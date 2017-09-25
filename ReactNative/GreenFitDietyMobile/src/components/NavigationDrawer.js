import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from './SideMenu';

class NavigationDrawer extends Component {


    render() {
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
              ref="navigation"
              styles={drawerStyles}
              open={state.open}
              onOpen={() => Actions.refresh({ key: state.key, open: true })}
              onClose={() => Actions.refresh({ key: state.key, open: false })}
              type="overlay"
              content={<SideMenu />}
              tapToClose
              openDrawerOffset={0.25}
              panCloseMask={0.25}
              negotiatePan
              elevation={5}
              captureGestures
              tweenHandler={(ratio) => ({
                main: { opacity: (2 - ratio) / 1.25 },
                drawer: {
                  shadowRadius: Math.min(ratio * 5 * 5, 5),
                  opacity: 1 / (2.07 - ratio)
                 }
              })}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: { backgroundColor: 'black', paddingLeft: 0 }
};

export default NavigationDrawer;
