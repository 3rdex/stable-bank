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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  };

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
              Balance: $35000
            </Text>
          </View>
          </Body>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', }}>
            <Button success onPress={() => {
              this.props.navigation.navigate('Payment')
            }}><Text> Send </Text></Button>
            <Button warning onPress={() => {
              this.props.navigation.navigate('Payment')
            }}><Text> Receive </Text></Button>
          </View>
        </CardItem>
      </Card>
    )
  }


  renderMerchandise() {
    const cards = [
      {
        text: 'Hilton',
        name: 'One',
        logo: require('../assets/merchandise/logo/hilton.png'),
        feature: require('../assets/merchandise/feature/hilton.jpg'),
      },
      {
        text: 'Sea World',
        name: 'Two',
        logo: require('../assets/merchandise/logo/sea-world.png'),
        feature: require('../assets/merchandise/feature/sea-world.jpg'),
      },
      {
        text: '711',
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
                  <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={item.feature}/>
              </CardItem>
              <CardItem>
                {/*<Icon name="heart" style={{ color: '#ED4A6A' }}/>*/}
                <Text>{item.name}</Text>
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
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            {/*<Icon name="arrow-back"/>*/}
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            {/*<Icon name="arrow-forward"/>*/}
            <Text>Swipe Right</Text>
          </Button>
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
