import React from 'react';
import {AsyncStorage, Button, FlatList, List, ListItem, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';


class PassScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userEmail: this.props.navigation.getParam('userEmail', null),
      passFound: this.props.navigation.getParam('passFound', false),
      passesArray: this.props.navigation.getParam('passesArray', null),
    };
  }

  handleEmail = (text) => {
    this.setState({ submittedEmail: text });
  }

  render() {

    return (
      <View>
       <Text>{this.state.userEmail}</Text>
      </View>
    );
  }
}

export default PassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    alignItems: "center",
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});