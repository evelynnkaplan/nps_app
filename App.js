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
      console.log("user already logged in");
      console.log("here's the user data"); 
      console.log(userJson);
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
          this.props.navigation.navigate('Details');
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
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
         <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
         <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  });

const AuthStack = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  SignIn: SignInScreen
});

export default createAppContainer(createSwitchNavigator({
  // AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
  },
  { initialRouteName: 'Auth',}
  ));

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: "center",
      // alignItems: "center",
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