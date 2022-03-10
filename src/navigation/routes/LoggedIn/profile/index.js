import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';

//  Screens
import ProfileScreen from 'views/containers/Profile';
import EditProfileScreen from 'views/containers/EditProfile';

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);

export default ProfileNavigator;
