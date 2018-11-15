import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ReceiptScreen from '../Screens/Confirmation';
import DepositScreen from '../Screens/DepositScreen';

export const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Deposit: {
    screen: DepositScreen,
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
