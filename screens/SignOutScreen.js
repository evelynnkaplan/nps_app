import React from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        await AsyncStorage.removeItem("passData");
      } catch (error) {
        this.props.navigation.navigate(
          'Home',
          { error: error}
          );
      }
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>You've been signed out.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Auth')}>
            <Text style={styles.buttonText}>Back to Sign-in</Text>
          </TouchableOpacity>
      </View>
       
    )
  }
}

export default SignOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D6D3B"
  },
  header: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  button: {
    padding: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 240,
  },
  buttonText: {
    fontSize: 16,
  }
});