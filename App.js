import React from 'react';
import { ActivityIndicator, AsyncStorage, Button, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as firebase from 'firebase';
import firebaseConfigKeys from './config';
import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

const firebaseConfig = {
  apiKey: firebaseConfigKeys.apiKey,
  authDomain: firebaseConfigKeys.authDomain,
  databaseURL: firebaseConfigKeys.databaseURL,
  projectId: firebaseConfigKeys.projectId,
  storageBucket: firebaseConfigKeys.storageBucket,
  messagingSenderId: firebaseConfigKeys.messagingSenderId,
  appId: firebaseConfigKeys.appId
};

firebase.initializeApp(firebaseConfig);

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.findUser();
  }

  async findUser () {
    const userToken = await AsyncStorage.getItem('userData');
    if (userToken) {
      const userJson = JSON.parse(JSON.parse(userToken));
      this.props.navigation.navigate(
        'Home', 
        { email: userJson["email"] })
    } else {
      console.log("redirecting to sign in screen...");
      this.props.navigation.navigate('SignIn')
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

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
          // Handle Errors here.
          console.log(error.message);
          
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
    return (
      <View style={styles.container}>
        <Text>Welcome to My NPS Pass. Please log into your account.</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
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
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={styles.submitButtonText}> Sign Up as New User </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

class SignUpScreen extends React.Component {
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
        .createUserWithEmailAndPassword(email, pass)
        .then(res => {
          console.log('success');
          this.storeToken(JSON.stringify(res.user));
          this.props.navigation.navigate(
            'Home', 
            { email: email })
        })
        .catch(error => {
          // Handle Errors here.
          console.log(error.message);
          
        });
    };

    async storeToken(user) {
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

  render () {
    return (
      <View style={styles.container}>
        <Text>Sign Up for a My NPS Pass Account</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
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
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

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

class HomeScreen extends React.Component {

  componentDidMount () {
    console.log(this.props.navigation);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Dashboard',
    };
  };

  render() {
    const email = this.props.navigation.getParam('email');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome, {email}</Text>
        <Button
          title="Log Out"
          onPress={() => this.props.navigation.navigate('SignOut')}
        />
      </View>
    );
  }
}

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
  });

const AuthStack = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

export default createAppContainer(createSwitchNavigator({
  // AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
  SignOut: SignOutScreen,
  },
  { initialRouteName: 'Auth',}
  ));

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