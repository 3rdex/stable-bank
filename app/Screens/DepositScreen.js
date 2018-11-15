import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';

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
      <Container style={{}}>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button block primary style={styles.button}>
            <View style={styles.row}>
              <View style={styles.logoWrapper}>
                <Image source={require('../assets/deposit/gusd.png')}/>
              </View>
              <Text>GemIni Dollar</Text>
            </View>
          </Button>
          <Button block warning style={styles.button}>
            <View style={styles.row}>
              <View style={styles.logoWrapper}>
                <Image source={require('../assets/deposit/usdc.png')}/>
              </View>
              <Text>USD Coin</Text>
            </View>
          </Button>
          <Button block success style={styles.button}>
            <View style={styles.row}>
              <View style={styles.logoWrapper}>
                <Image source={require('../assets/deposit/paxos.png')}/>
              </View>
              <Text>Paxos Standard Token</Text>
            </View>
          </Button>
          <Button block info style={styles.button}>
            <View style={styles.row}>
              <View style={styles.logoWrapper}>
                <Image style={{ height: 40, width: 40 }} source={require('../assets/deposit/bank.jpg')}/>
              </View>
              <Text>Bank Deposit</Text>
            </View>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 24, height: 80, borderRadius: 12
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  logoWrapper: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12
  }
});
