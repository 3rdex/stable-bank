import React from 'react';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import HomeScreen from './Screens/HomeScreen';
import DetailScreen from './Screens/DetailScreen';

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
}, {
  initialRouteName: 'Home',
});
