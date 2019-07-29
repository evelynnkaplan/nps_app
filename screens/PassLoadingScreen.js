import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';

class PassLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.findUser();
  }

  async findUser () {
    const userToken = await AsyncStorage.getItem('userData');
    const userJson = JSON.parse(JSON.parse(userToken));
    const passes = [];
    if (userToken) {
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
        this.props.navigation.navigate(
          'Pass',
          { userEmail: userJson["email"],
            passFound: true,
            passesArray: passes,
        });
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

    render() {
      return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}

export default PassLoadingScreen;