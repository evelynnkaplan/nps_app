import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Dashboard',
    };
  };

  render() {
    const email = this.props.navigation.getParam('email');

    return (
      <View style={styles.container}>
        <Text>Welcome, {email}</Text>
        <Button
          title="Your Pass"
          onPress={() => this.props.navigation.navigate('PassLoading')}
        />
         <Button
          title="Your Visit History"
          onPress={() => this.props.navigation.navigate('VisitsLoading')}
        />
         <Button
          title="Sign Out"
          onPress={() => this.props.navigation.navigate('SignOut')}
        />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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