import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Loading from '../screens/LoadingScreen';
import Signup from '../screens/SignupScreen';
import Login from '../screens/LoginScreen';

export default createAppContainer(
  createSwitchNavigator(
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
);
