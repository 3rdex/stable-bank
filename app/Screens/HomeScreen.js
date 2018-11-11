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
import {Customer} from "../Services/Customer";

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

  renderAccount() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>My Account</Text>
        </CardItem>
        <CardItem>
          <Body>
          <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>
              Balance: {this.state.balance}
            </Text>
          </View>
          </Body>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', }}>
            <Button success onPress={async () => {
              await Customer.prepare();
              this.props.navigation.navigate('Payment')
            }}><Text> Pay </Text></Button>
            <Button warning onPress={() => null}><Text> Receive </Text></Button>
          </View>
        </CardItem>
      </Card>
    )
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
      <View style={{ height: 500, position: 'relative' }}>
        <DeckSwiper
          ref={(c) => this._deckSwiper = c}
          dataSource={cards}
          renderEmpty={() =>
            <View style={{ alignSelf: "center" }}>
              <Text>Over</Text>
            </View>}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={item.logo}/>
                  <Body>
                  <Text>{item.text}</Text>
                  <Text note>{item.category}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={item.feature}/>
              </CardItem>
            </Card>
          }
        />
        <View style={{
          flexDirection: "row",
          flex: 1,
          position: "absolute",
          top: 430,
          left: 0,
          right: 0,
          justifyContent: 'space-between',
          padding: 15
        }}>
        </View>
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Content padder>
          {this.renderAccount()}
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
