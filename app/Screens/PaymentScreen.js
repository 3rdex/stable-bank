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
              <Text>This is Payment Card</Text>
            </CardItem>
            <CardItem>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Image style={{ width: 200, height: 200 }}
                       source={require('../assets/payments/bar-code.png')}/>
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
