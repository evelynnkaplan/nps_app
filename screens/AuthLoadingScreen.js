import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
// Much sign-in/sign-out functionality came from the help of this article: https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c

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
      this.props.navigation.navigate('SignIn')
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

export default AuthLoadingScreen;

const styles = StyleSheet.create({
container: {
  flex: 2,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1D6D3B"
},
});