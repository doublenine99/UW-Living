import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Loading from '../screens/LoadingScreen';
import Signup from '../screens/SignupScreen';
import Login from '../screens/LoginScreen';

const switchNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Loading,
    // Signup,
    // Login,
    Main: MainTabNavigator,
  },
  {
    // initialRouteName: 'Loading'
  })
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
