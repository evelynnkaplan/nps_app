import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';

class PassLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.findUser();
  }

  async findUser () {
    const userToken = await AsyncStorage.getItem('userData');
    const passData = await AsyncStorage.getItem('passData');
    const userJson = JSON.parse(JSON.parse(userToken));
    const passes = [];
    if (passData) {
        this.props.navigation.navigate(
          'Pass',
          { userEmail: userJson["email"],
            passFound: true,
            passesArray: JSON.parse(passData),
        });
    } else {
      fetch(`http://mynpspass.herokuapp.com/userpass/${userJson['email']}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        for (let item in data) {
          let obj = {};
          obj['passId'] = item;
          obj['expirationDate'] = data[item]['expiration_date'];
          obj['type'] = data[item]['type'];
          passes.push(obj);
        }
        this.storeToken(passes);
        this.props.navigation.navigate(
          'Pass',
          { userEmail: userJson["email"],
            passFound: true,
            passesArray: passes,
        });
      })
      .catch((error) => {
        this.props.navigation.navigate(
          'Home',
          { error: error}
          );
      });
    }
  }

  getPass = (email) => {
    fetch(`http://mynpspass.herokuapp.com/userpass/${email}`)
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
      })
    }

    async storeToken (passArray) {
      try {
        await AsyncStorage.setItem("passData", JSON.stringify(passArray));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="white" size="large" />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}

export default PassLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D6D3B"
  },
});