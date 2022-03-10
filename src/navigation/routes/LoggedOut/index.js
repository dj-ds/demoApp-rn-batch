import {createStackNavigator} from 'react-navigation-stack';

// Login Screens
import LoginScreen from 'views/containers/Login';
import OTPScreen from 'views/containers/Otp';

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

export default LoggedOutNavigator;
