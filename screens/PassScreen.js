import React from "react";
import { Button,  FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HeaderBackButton } from 'react-navigation';

class PassScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userEmail: this.props.navigation.getParam('userEmail', null),
      passesArray: this.props.navigation.getParam('passesArray', null)
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Passes',
      headerLeft: <HeaderBackButton onPress={()=>{navigation.navigate('Home')}} backTitleVisible={true} />
    };
  };

  render() {

    let headerText = "";
    if (this.state.passesArray.length > 0) {
      headerText = "Click on a pass to get the barcode."
    } else {
      headerText = `The email address ${this.state.userEmail} is not associated with any passes. \n \n If your pass is associated with another email address, sign out and sign in with the associated email address.`
    }

    const formatExpirationDate = (str) => {
      if (str != null) {
        return str
      } else { 
        return "N/A"
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{headerText}</Text>
        </View>
         <FlatList 
          data={this.state.passesArray}
          renderItem={({item}) => 
            <TouchableOpacity 
              style={styles.passData}
              onPress={() => this.props.navigation.navigate('PassBarcode', {passId: item.passId }) }>
              <Text><Text style={styles.label}>Pass ID: </Text>{item.passId}</Text>
              <Text><Text style={styles.label}>Pass Type: </Text>{item.type}</Text>
              <Text><Text style={styles.label}>Expiration Date: </Text>{formatExpirationDate(item.expirationDate)}</Text>
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
    padding: 20,
    fontSize: 14,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  label: {
    fontWeight: "bold",
  },
  headerContainer: {
    padding: 30,
    marginTop: 50
  },
  header: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    testAlign: "left",
    fontSize: 20,
  }
});