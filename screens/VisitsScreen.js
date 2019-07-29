import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

class VisitsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Visits',
    };
  };

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    );
  }
}

export default VisitsScreen;