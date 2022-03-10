import {createSwitchNavigator} from 'react-navigation';

// Routes
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

export const createRootNavigator = isLoggedIn => {
  const ROUTES = {
    LoggedOut: LoggedOut,
    LoggedIn: LoggedIn,
  };

  let initialRouteName = 'LoggedOut';

  if (isLoggedIn) {
    initialRouteName = 'LoggedIn';
  }

  return createSwitchNavigator(ROUTES, {initialRouteName});
};
