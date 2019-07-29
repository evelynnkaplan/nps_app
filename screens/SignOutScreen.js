import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

class SignOutScreen extends React.Component {

  componentDidMount () {
    this.logout();
  }

  logout = () => {
    console.log(AsyncStorage);
    firebase
      .auth().signOut()
      .then(async () => {
      try {
        await AsyncStorage.removeItem("userData");
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>You're logged out!</Text>
        <Button
          title="Back to Sign-in"
          onPress={() => this.props.navigation.navigate('Auth')}
        />
      </View>
       
    )
  }
}

export default SignOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#1D6D3B"
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