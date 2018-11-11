import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import DetailScreen from '../Screens/DetailScreen';

export const RootStack =  createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
}, {
  initialRouteName: 'Home',
});
