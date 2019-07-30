import React from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as firebase from 'firebase';
// Much sign-in/sign-out functionality came from the help of this article: https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c
// Firebase help came from here: https://firebase.google.com/docs/auth/web/firebaseui

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
      };
    }

    static navigationOptions = () => {
      return {
        headerLeft: null,
      };
    };

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
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{responseMessage}</Text>
          <Text style={styles.header}>Welcome to My NPS Pass</Text>
          <Text style={styles.subHeader}>Please sign in or sign up with the email address associated with your annual pass.</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}> Sign in as Existing User </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.signup(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}> Sign Up as New User </Text>
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
    alignItems: "center",
    backgroundColor: "#1D6D3B"
  },
  headerContainer: {
    padding: 10
  },
  header: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    padding: 8,
  },
  subHeader: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
  },
  input: {
    margin: 15,
    height: 50,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "black",
    width: "80%",
    textAlign: "center"
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