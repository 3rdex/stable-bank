import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Body, Left, Right } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>NativeBase</Text>
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
          <Card>
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
