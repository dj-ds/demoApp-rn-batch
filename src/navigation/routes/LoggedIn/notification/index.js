import {createStackNavigator} from 'react-navigation-stack';

// Login Screens

import Notification from 'views/containers/Notification';

const NotificationNavigator = createStackNavigator(
  {
    Notification: Notification,
  },
  {
    initialRouteName: 'Notification',
    headerMode: 'none',
  },
);

export default NotificationNavigator;
