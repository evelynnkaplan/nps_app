import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';

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
      })
      .catch((error) => {
        this.props.navigation.navigate(
          'Home',
          { error: error}
          );
      });
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

export default VisitsLoadingScreen;

const styles = StyleSheet.create({
container: {
  flex: 2,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1D6D3B"
},
});