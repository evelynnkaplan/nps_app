import React from "react";
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";

class PassScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userEmail: this.props.navigation.getParam('userEmail', null),
      passFound: this.props.navigation.getParam('passFound', false),
      passesArray: this.props.navigation.getParam('passesArray', null),
    };
  }

  handleEmail = (text) => {
    this.setState({ submittedEmail: text });
  }

  render() {

    return (
      <View style={styles.container}>
         <FlatList 
          data={this.state.passesArray}
          renderItem={({item}) => <Text>{item.passId}</Text>}
          keyExtractor={item => item.passId}
         />
      </View>
    );
  }
}

export default PassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
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