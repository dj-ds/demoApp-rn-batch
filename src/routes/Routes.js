import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

// Login Screens
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OtpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ExtraScreen from '../screens/ExtraScreen';
import NotificationScreen from '../screens/NotificationScreen';

// Assignments
import HrAddAssignmentScreen from '../screens/Assignments/HrAddAssignmentScreen';
import HrAssignmentDetailScreen from '../screens/Assignments/HrAssignmentDetailScreen';
import HrAssignmentsScreen from '../screens/Assignments/HrAssignmentsScreen';

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

const AssignmentsNavigator = createStackNavigator(
  {
    HrAssignments: HrAssignmentsScreen,
    HrAssignmentDetail: HrAssignmentDetailScreen,
    HrAddAssignment: HrAddAssignmentScreen,
  },
  {
    initialRouteName: 'HrAssignments',
    headerMode: 'none',
  },
);

const LoggedInNavigator = createSwitchNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    Extra: ExtraScreen,
    Notification: NotificationScreen,
    Assignments: AssignmentsNavigator,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
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
