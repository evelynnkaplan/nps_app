import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as firebase from 'firebase';

class HomeScreen extends React.Component {

  static navigationOptions = () => {
    return {
      title: 'Your Dashboard',
    };
  };

  render() {
    const email = this.props.navigation.getParam('email');

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome, {email}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('PassLoading')}>
            <Text style={styles.buttonText}>Your Pass</Text>
          </TouchableOpacity>
         <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('VisitsLoading')}>
        <Text style={styles.buttonText}>Your Visit History</Text>
        </TouchableOpacity>
         <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('SignOut')}>
        <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;

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
    testAlign: "left",
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