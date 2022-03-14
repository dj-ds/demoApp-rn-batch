import {createSwitchNavigator} from 'react-navigation';

// Screens
import HomeScreen from 'views/containers/Home';
import ExtraScreen from 'views/containers/Extra';
import ContactList from 'views/containers/Contact';

// Routes
import Profile from './profile';
import Notification from './notification';

const LoggedInNavigator = createSwitchNavigator(
  {
    Home: HomeScreen,
    Profile: Profile,
    Extra: ContactList,
    Notification: Notification,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default LoggedInNavigator;
