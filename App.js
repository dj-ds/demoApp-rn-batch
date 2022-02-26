import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

// Routes
import {createAppContainer} from 'react-navigation';
import {createRootNavigator} from './src/routes/Routes';
import {nsSetTopLevelNavigator} from './src/routes/NavigationService';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
    };
  }
  render() {
    const RootNavigator = createRootNavigator();
    const AppContainer = createAppContainer(RootNavigator);

    return <AppContainer ref={this.setNavigatorRef} />;
  }
}
