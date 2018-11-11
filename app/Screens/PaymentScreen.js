import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Pay',
  };

  render() {
    return (
      <View style={styles}>
        <Text>Detail Screen 1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
