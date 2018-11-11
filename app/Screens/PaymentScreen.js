import React from 'react';
import { StyleSheet, View, Image,TouchableOpacity } from 'react-native';
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

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Pay',
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowPayment: false
    }
  }

  toggleIsShowPayment() {
    this.setState({
      isShowPayment: !this.state.isShowPayment
    })
  }

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
                <TouchableOpacity onPress={this.toggleIsShowPayment.bind(this)}>
                  <Image style={{ width: 200, height: 200, marginBottom: 20 }}
                         source={require('../assets/payments/qr-code.jpg')}/>
                </TouchableOpacity>
                <Text>Auto update in every minute</Text>
              </View>
            </CardItem>
          </Card>
        </Content>
        {this.state.isShowPayment && <BlurView tint="dark" intensity={40}
                                               style={{
                                                 flex: 1,
                                                 position: 'absolute',
                                                 top: 0,
                                                 left: 0,
                                                 right: 0,
                                                 bottom: 0,
                                                 justifyContent: 'flex-end',
                                               }}>
          <View style={{ height: 300, backgroundColor: '#fdfdfd', borderTopLeftRadius: 12, borderTopRightRadius: 12, }}>
            <CardItem bordered>
              <Body>
              <Text>Confirm Payment</Text>
              </Body>
            </CardItem>
            <CardItem style={{}}>
              <View style={{ height: 150, flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ alignSelf: 'center', fontSize: 24 }}>$40.00</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{}}>Amount</Text>
                  <Text>$40.00</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{}}>Promotion</Text>
                  <Text>-$30.00</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{}}>Total</Text>
                  <Text>$10.00</Text>
                </View>
              </View>
            </CardItem>
            <CardItem>
              <Body>
              <Button primary style={{ alignSelf: 'center' }} onPress={() => {
                this.props.navigation.navigate('Receipt')
              }}>
                <Text>Confirm Pay</Text>
              </Button>
              </Body>
            </CardItem>
          </View>
        </BlurView>}
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
