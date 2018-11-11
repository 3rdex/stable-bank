import React from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";

const RootStack = createStackNavigator({
  Home: HomeScreen,
});

export default RootStack;
