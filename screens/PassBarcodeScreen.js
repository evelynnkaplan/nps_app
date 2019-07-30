import React from "react";
import Barcode from 'react-native-barcode-builder';
import { View, Text, StyleSheet } from "react-native";

class PassBarcodeScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      passId: this.props.navigation.getParam('passId', null),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.barcodeContainer}>
          <Barcode value={this.state.passId} width="2.5" height="150" format="CODE128" />
        </View>
        <Text></Text>
      </View>
      );
  }
}

export default PassBarcodeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
});