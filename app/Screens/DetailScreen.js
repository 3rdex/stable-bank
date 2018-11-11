import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail Screen',
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
