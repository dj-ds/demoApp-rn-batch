import {createSwitchNavigator} from 'react-navigation';

// Screens
import HomeScreen from 'views/containers/Home';
import ExtraScreen from 'views/containers/Extra';

// Routes
import Profile from './profile';
import Notification from './notification';

const LoggedInNavigator = createSwitchNavigator(
  {
    Home: HomeScreen,
    Profile: Profile,
    Extra: ExtraScreen,
    Notification: Notification,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default LoggedInNavigator;
