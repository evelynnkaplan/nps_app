import React from "react";
import Barcode from 'react-native-barcode-builder';
import { View, Text, StyleSheet } from "react-native";

class PassBarcodeScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      passId: this.props.navigation.getParam('passId', 'no pass found'),
    };
  }

  render() {
    return (
      <View>
        <View style={styles.barcodeContainer}>
          <Barcode value={this.state.passId} width="2.5" height="150" format="CODE128" />
        </View>
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