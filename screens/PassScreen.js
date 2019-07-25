import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

class PassScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Pass',
    };
  };

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>PassScreen</Text>
      </View>
    );
  }
}

export default PassScreen;