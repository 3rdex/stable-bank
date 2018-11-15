import React from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';
import { BlurView } from 'expo';

export default class SimulateScanScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan',
  };


  renderCode() {
    return (
      <Image style={{ width: 200, height: 200, marginBottom: 20 }}
             source={require('../assets/payments/qr-code.jpg')}/>);
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#1180bb' }}>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ borderRadius: 4, width: '90%' }}>
            <CardItem style={{}}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image style={{ width: '100%', height: 60, zIndex: 99 }}
                       source={require('../assets/payments/bar-code.png')}/>
                <Text>1231 8947 9383 9821</Text>
              </View>
            </CardItem>
            <CardItem style={{ backgroundColor: '#f0f0f2' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {this.renderCode()}
                <Text>Auto update every minute</Text>
              </View>
            </CardItem>
          </Card>
        </Content>
        <BlurView tint="dark" intensity={60}
                  style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
          <View style={{ position: 'relative' }}>
            <Image style={{ width: 320, height: 320, marginTop: 60 }}
                   source={require('../assets/payments/qr-code.jpg')}/>
            <Animated.View style={{
              position:'absolute', bottom:0,
              height: 3, backgroundColor: 'red', width:320,
              transform: [{
                translateY: -320
              }],
            }}>
            </Animated.View>
          </View>
          <Text style={{ marginTop: 20, color: 'white' }}>Place the QR Code inside</Text>
        </BlurView>
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
