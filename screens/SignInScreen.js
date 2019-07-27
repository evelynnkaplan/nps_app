import React from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as firebase from 'firebase';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
      };
    }

    handleEmail = (text) => {
      this.setState({ email: text });
    };

    handlePassword = (text) => {
      this.setState({ password: text });
    };

    login = (email, pass) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(res => {
          console.log('success');
          this.storeToken(JSON.stringify(res.user));
          this.props.navigation.navigate(
            'Home', 
            { email: email })
        })
        .catch(error => {
          let message = "";
          if (error.code === 'auth/invalid-email') {
            message = "Please use a valid email address.";
          } else if (error.code === 'auth/user-not-found') {
            message = "A user with that email address was not found. Sign up as a new user.";
          } else {
            message = error.message;
          };
          this.props.navigation.navigate('SignIn', 
            {message: message});
        });
    };

    signup = (email, pass) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(res => {
          console.log('success');
          this.storeToken(JSON.stringify(res.user));
          this.props.navigation.navigate(
            'Home', 
            { email: email })
        })
        .catch(error => {
          let message = "";
          if (error.code === 'auth/invalid-email') {
            message = "Please use a valid email address.";
          } else if (error.code === 'auth/user-not-found') {
            message = "A user with that email address was not found. Sign up as a new user.";
          } else {
            message = error.message;
          };
          this.props.navigation.navigate('SignIn', 
            {message: message});
        });
      };

    async storeToken (user) {
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

  render () {
    const responseMessage = this.props.navigation.getParam('message')

    return (
      <View style={styles.container}>
        <Text>{responseMessage}</Text>
        <Text>Welcome to My NPS Pass App.</Text>
        <Text>Please log in or sign up with the email address associated with your annual pass.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}> Sign in as Existing User </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.signup(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}> Sign Up as New User </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

export default SignInScreen;

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