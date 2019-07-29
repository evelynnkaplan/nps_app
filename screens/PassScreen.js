import React from 'react';
import {AsyncStorage, Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';


class PassScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userEmail: "",
      passFound: false,
      passesArray: []
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
    if (userToken) {
      this.setState({ 
        userEmail: userJson["email"], 
        passFound: true,});
      this.getPass();
    }
  }

  handleEmail = (text) => {
    this.setState({ submittedEmail: text });
  }

  getPass = () => {
      fetch(`http://mynpspass.herokuapp.com/userpass/${this.state.userEmail}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const passes = [];
          for (let item in data) {
            let obj = {};
            obj['passId'] = item;
            obj['expirationDate'] = data[item]['expiration_date'];
            obj['type'] = data[item]['type'];
            passes.push(obj);
          }
          this.setState({ passesArray: passes });
          console.log(this.state);
        })
        .catch(err => {
          // Do something for an error here
        })
      }

  render() {

    // const formatFlatlistData = () => {
    //   const passData = [];
    //   for (let pass in this.state.passJson) {
    //     let obj = {};
    //     obj[this.state.passJson
    //   }
    // }

    const getView = () => {
      if (this.state.passFound) {
        // formatFlatlistData();
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