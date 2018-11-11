import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import PaymentScreen from '../Screens/PaymentScreen';

export const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Payment: {
    screen: PaymentScreen,
  },
}, {
  initialRouteName: 'Payment',
  headerMode: 'float',
});
