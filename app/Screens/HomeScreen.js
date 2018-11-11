import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  };

  render() {
    return (
      <Container>
        <Content>
          <Button primary onPress={() => {
            this.props.navigation.navigate('Detail')
          }}><Text> Navigate To Detail Screen </Text></Button>
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
