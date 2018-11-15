import React from 'react';
import {ActivityIndicator, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
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
import {BlurView} from 'expo';
import {Shop} from "../Services/Shop";
import {Customer} from "../Services/Customer";
import Spinner from 'react-native-loading-spinner-overlay';

export default class DepositScreen extends React.Component {
  static navigationOptions = {
    title: 'Pay',
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <Container style={{backgroundColor: '#1180bb'}}>
        <Content padder contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Card style={{borderRadius: 4, width: '90%'}}>
            <Text>Charge Screen</Text>
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
