import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  DeckSwiper,
  Thumbnail,
  Icon,
} from 'native-base';
import { BlurView } from 'expo';

export default class ReceiptScreen extends React.Component {
  static navigationOptions = {
    title: 'Receipt',
  };

  render() {
    return (
      <Container style={{}}>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 80, width: 80 }} source={require('../assets/logo/iTunesArtwork.png')}></Image>
            <Text style={{ color: '#0a88ff', fontSize: 24, }}>Payment Success!</Text>
            <Text style={{ fontSize: 28, marginTop: 20, }}>$37.99</Text>
            <Text style={{ fontSize: 16, marginTop: 20, textDecorationLine: 'line-through' }}>$40.99</Text>
          </View>
        </Content>
      </Container>
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
