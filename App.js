import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import firebaseConfigKeys from './config';
import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';
import SignOutScreen from './screens/SignOutScreen';
import HomeScreen from './screens/HomeScreen';

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

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
  });

const AuthStack = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  SignIn: SignInScreen,
});

export default createAppContainer(createSwitchNavigator({
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