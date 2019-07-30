import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';

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