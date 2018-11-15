import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
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
import { Customer } from "../Services/Customer";
import { LinearGradient } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  };

  state = {
    balance: 'loading'
  };

  async componentDidMount() {
    const balance = await Customer.getBalance();
    this.setState({
      balance: `$${balance.toFixed(2)}`
    })
  }

  renderMerchandise() {
    const cards = [
      {
        text: 'Hilton',
        category: 'hotel',
        name: 'One',
        logo: require('../assets/merchandise/logo/hilton.png'),
        feature: require('../assets/merchandise/feature/hilton.jpg'),
      },
      {
        text: 'Sea World',
        category: 'tour',
        name: 'Two',
        logo: require('../assets/merchandise/logo/sea-world.png'),
        feature: require('../assets/merchandise/feature/sea-world.jpg'),
      },
      {
        text: '711',
        category: 'store',
        name: 'Three',
        logo: require('../assets/merchandise/logo/seven-eleven.png'),
        feature: require('../assets/merchandise/feature/seven-eleven.jpg'),
      },
    ];
    return (
      <View>
        <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 20 }}>Available Merchandise: </Text>
        {cards.map(item =>
          (<Card style={{ elevation: 3 }} key={item.text}>
            <CardItem>
              <Left>
                <Thumbnail source={item.logo}/>
                <Body>
                <Text>{item.text}</Text>
                <Text note>{item.category}</Text>
                </Body>
              </Left>
              <Right>
                <Image style={{ height: 60, width: 120 }} source={item.feature}/>
              </Right>
            </CardItem>
            {/*<CardItem cardBody>*/}

            {/*</CardItem>*/}
          </Card>))
        }
        <Button rounded block bordered info style={{ marginTop: 12 }}><Text>Show More</Text></Button>
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Content padder>
          <LinearGradient
            colors={['#52BDDD', '#48C0D9']}
            style={{ borderRadius: 12 }}
          >
            <View style={{ flexDirection: 'row', padding: 20 }}>
              <Left>
                <Text style={{ color: 'white' }}>My Account</Text>
              </Left>
              <Right>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Deposit')}>
                  <Text style={{ fontSize: 24, color: 'white' }}>+</Text>
                </TouchableOpacity>
              </Right>
            </View>
            <View style={{ padding: 20, height: 100, justifyContent: 'center' }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
                Balance: {this.state.balance}
              </Text>
            </View>
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button success onPress={async () => {
                this.props.navigation.navigate('Payment')
              }}><Text> Pay </Text></Button>
              <Button warning onPress={() => null}><Text> Receive </Text></Button>
            </View>
          </LinearGradient>
          {this.renderMerchandise()}
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
