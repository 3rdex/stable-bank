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
          <Text>$35,000</Text>
        </CardItem>
        <CardItem>
          <Body>
          <Text>
            NativeBase is a free and open source framework that enable
            developers to build
            high-quality mobile apps using React Native iOS and Android
            apps
            with a fusion of ES6.
          </Text>
          </Body>
        </CardItem>
      </Card>
    )
  }

  renderActions() {
    return (<Card>
      <CardItem>
        <Left>
          <Button primary onPress={() => {
            this.props.navigation.navigate('Detail')
          }}><Text> Send </Text></Button>
        </Left>
        <Right>
          <Button primary onPress={() => {
            this.props.navigation.navigate('Detail')
          }}><Text> Receive </Text></Button>
        </Right>
      </CardItem>
    </Card>)
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
      <View>
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
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Content padder>
          {this.renderAccount()}
          {this.renderActions()}
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
