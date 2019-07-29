import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';

class VisitsLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.findUser();
  }

  async findUser () {
    const userToken = await AsyncStorage.getItem('userData');
    const userJson = JSON.parse(JSON.parse(userToken));
    const visits = [];
    if (userToken) {
      fetch(`http://mynpspass.herokuapp.com/uservisits/${userJson['email']}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        for (let item in data) {
         visits.push(data[item]);
        }
        this.props.navigation.navigate(
          'Visits',
          { visitsArray: visits }
          );
      });
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

export default VisitsLoadingScreen;