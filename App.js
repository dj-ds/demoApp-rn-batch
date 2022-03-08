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

// User Preference
import {KEYS, getData} from './src/api/UserPreference';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    this.initialSetup();
  }

  initialSetup = async () => {
    try {
      const userInfo = await getData(KEYS.USER_INFO);

      const isLoggedIn = userInfo ? true : false;

      this.setState({isLoggedIn});
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {isLoggedIn} = this.state;

    const RootNavigator = createRootNavigator(isLoggedIn);
    const AppContainer = createAppContainer(RootNavigator);

    return <AppContainer ref={this.setNavigatorRef} />;
  }
}
