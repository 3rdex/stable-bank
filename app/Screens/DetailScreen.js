import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class DetailScreen extends React.Component {
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
