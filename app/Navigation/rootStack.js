import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ReceiptScreen from '../Screens/Confirmation';

export const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Payment: {
    screen: PaymentScreen,
  },
  Receipt: {
    screen: ReceiptScreen,
  },
}, {
  initialRouteName: 'Home',
  headerMode: 'float',
});
