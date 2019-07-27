import React from 'react';
import {AsyncStorage, Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
// import console = require('console');

class PassScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userEmail: "",
      passFound: false
    }
  }

  componentDidMount () { 
    this.findUser();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Pass',
    };
  }

  async findUser () {
    const userToken = await AsyncStorage.getItem('userData');
    const userJson = JSON.parse(JSON.parse(userToken));
    this.setState({ userEmail: userJson["email"], passFound: true });
  }

  handleEmail = (text) => {
    this.setState({ submittedEmail: text });
  }

  getPass = () => {

  }

  

  render() {

    const getView = () => {
      if (this.state.passFound) {
        return <Text>hello found ur pass</Text>;
      } else {
        return <Text>hi</Text>;
      }
    }

    return (
       <View>
         { getView() }
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