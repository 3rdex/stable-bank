import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ReceiptScreen from '../Screens/Confirmation';
import DepositScreen from '../Screens/DepositScreen';
import SimulateScanScreen from '../Screens/SimulateScanScreen';

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
  Simulate: {
    screen: SimulateScanScreen
  },
  Receipt: {
    screen: ReceiptScreen,
  },
}, {
  initialRouteName: 'Simulate',
  headerMode: 'float',
});
