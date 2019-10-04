import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HouseScreen from '../screens/HouseScreen';
import HouseDetail from '../components/HousedetailComponent';
import FindHouseScreen from '../screens/FindHouseScreen';
import AddHouseSceen from '../screens/AddHouseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Signup from '../screens/SignupScreen';
import Login from '../screens/LoginScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HouseNavigator = createStackNavigator(
  {
    HouseScreen: { screen: HouseScreen },
    HouseDetail: { screen: HouseDetail }
  },
  config
);
HouseNavigator.navigationOptions = {
  tabBarLabel: 'All Houses',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
HouseNavigator.path = '';

// Stack for FindHouse
const FindHouseStack = createStackNavigator(
  {
    FindHouse: FindHouseScreen,
  },
  config
);
FindHouseStack.navigationOptions = {
  tabBarLabel: 'Find House',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

// Stack for AddHouse
const AddHouseStack = createStackNavigator(
  {
    AddHouse: AddHouseSceen,
    Login: { screen: Login }
  },
  config
);
AddHouseStack.navigationOptions = {
  tabBarLabel: 'Add House',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
AddHouseStack.path = '';
// Stack for Profile
const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Login: { screen: Login },
    Signup: { screen: Signup }
  },
  config
);
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};
ProfileStack.path = '';

//
const tabNavigator = createBottomTabNavigator({
  HouseNavigator,
  FindHouse: FindHouseStack,
  AddHouseStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
