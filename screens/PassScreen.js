import React from "react";
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        <Text style={styles.header}>Click on a pass to get the barcode.</Text>
         <FlatList 
          data={this.state.passesArray}
          renderItem={({item}) => 
            <TouchableOpacity 
              style={styles.passData}
              onPress={() => this.props.navigation.navigate('PassBarcode', {passId: item.passId }) }>
              <Text>Pass ID: {item.passId}</Text>
              <Text>Pass Type: {item.type}</Text>
              <Text>Expiration Date: {item.expirationDate}</Text>
            </TouchableOpacity>}
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
    alignItems: "center",
    backgroundColor: "#1D6D3B"
  },
  passData: {
    padding: 10,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  header: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 15
  }
});