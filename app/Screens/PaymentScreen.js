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

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Pay',
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#1180bb' }}>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ borderRadius: 4, width: '90%' }}>
            <CardItem style={{}}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image style={{ width: '100%', height: 60 }}
                       source={require('../assets/payments/bar-code.png')}/>
                <Text>1231 8947 9383 9821</Text>
              </View>
            </CardItem>
            <CardItem style={{ backgroundColor: '#f0f0f2' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image style={{ width: 200, height: 200, marginBottom:20 }}
                       source={require('../assets/payments/qr-code.jpg')}/>
                <Text>Auto update in every minute</Text>
              </View>
            </CardItem>
          </Card>
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
