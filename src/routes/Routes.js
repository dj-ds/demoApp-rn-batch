import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

// Login Screens
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OtpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExtraScreen from '../screens/ExtraScreen';

const LoggedOutNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    OTP: OTPScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const LoggedInNavigator = createSwitchNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Extra: ExtraScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export const createRootNavigator = isLoggedIn => {
  const ROUTES = {
    LoggedOut: LoggedOutNavigator,
    LoggedIn: LoggedInNavigator,
  };

  let initialRouteName = 'LoggedOut';

  if (isLoggedIn) {
    initialRouteName = 'LoggedIn';
  }

  return createSwitchNavigator(ROUTES, {initialRouteName});
};
