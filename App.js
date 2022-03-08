import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

// Routes
import {createAppContainer} from 'react-navigation';
import {createRootNavigator} from './src/routes/Routes';
import {nsSetTopLevelNavigator} from './src/routes/NavigationService';

// User Preference
import {KEYS, getData} from './src/api/UserPreference';

// Firebase API
import {
  checkPermission,
  createOnTokenRefreshListener,
  removeOnTokenRefreshListener,
  createNotificationListeners,
  removeNotificationListeners,
} from './src/firebase_api/FirebaseAPI';

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

  componentWillUnmount() {
    // Removing firebase listeners
    removeOnTokenRefreshListener(this);
    removeNotificationListeners(this);
  }

  initialSetup = async () => {
    try {
      // checking fcm permission
      await checkPermission();

      // Adding firebase listeners
      createOnTokenRefreshListener(this);
      createNotificationListeners(this);

      const userInfo = await getData(KEYS.USER_INFO);
      const isLoggedIn = userInfo ? true : false;

      this.setState({isLoggedIn});
    } catch (error) {
      console.log(error.message);
    }
  };

  setNavigatorRef = ref => {
    nsSetTopLevelNavigator(ref);
  };

  render() {
    const {isLoggedIn} = this.state;

    const RootNavigator = createRootNavigator(isLoggedIn);
    const AppContainer = createAppContainer(RootNavigator);

    return <AppContainer ref={this.setNavigatorRef} />;
  }
}
