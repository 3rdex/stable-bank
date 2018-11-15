import React from 'react';
import { Animated, Easing, StyleSheet, View, Image, StatusBar } from 'react-native';
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
    title: 'QR Code Scan',
    headerStyle: {
      backgroundColor: '#2f2e31'
    },
    headerTitleStyle: {
      color: 'white'
    }
  };

  animation = new Animated.Value(0);

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content');
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => this.startAnimation());
  }


  renderScanner() {
    return (
      <BlurView tint="dark" intensity={50}
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
          <Image style={{ width: 160, height: 160, marginTop: 100 }}
                 source={require('../assets/payments/qr-code.jpg')}/>
          <Animated.View style={{
            position: 'absolute', bottom: 0,
            height: 3, backgroundColor: 'rgba(255, 0, 0, .7)', width: 160,
            shadowOffset: { width: 10, height: 10, },
            shadowColor: 'rgba(255, 0, 0, .5)',
            shadowOpacity: 1.0,
            transform: [{
              translateY: this.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-160, 0]
              })
            }],
          }}>
          </Animated.View>
        </View>
        <Text style={{ marginTop: 20, color: 'white' }}>Place the QR Code inside</Text>
      </BlurView>
    )
  }

  render() {
    return (
      <Container>
        <Image style={{
          width: '100%',
          height: '100%'
        }} source={require('../assets/payments/bg.png')}/>
        {this.renderScanner()}
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
