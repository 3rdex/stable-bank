import React from 'react';
import { ActivityIndicator, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
import { Shop } from "../Services/Shop";
import { Customer } from "../Services/Customer";
import Spinner from 'react-native-loading-spinner-overlay';

export default class DepositScreen extends React.Component {
  static navigationOptions = {
    title: 'Deposit',
  };

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <Container style={{ }}>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button block primary style={{ marginBottom: 24, height: 80, borderRadius: 12 }}>
            <Text>Bitcoin</Text>
          </Button>
          <Button block warning style={{ marginBottom: 24, height: 80, borderRadius: 12 }}>
            <Text>Ethereum</Text>
          </Button>
          <Button block info style={{ marginBottom: 24, height: 80, borderRadius: 12 }}>
            <Text>EOS</Text>
          </Button>
          <Button block success style={{ marginBottom: 12, height: 80, borderRadius: 12 }}>
            <Text>Bank Account</Text>
          </Button>
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
