import React from "react";
import Barcode from 'react-native-barcode-builder';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class PassBarcodeScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      passId: this.props.navigation.getParam('passId', null),
    };
  }

  render() {
    console.log(this.state);
    return (
      <Barcode value={this.state.passId} format="CODE128" />
      );
  }
}

export default PassBarcodeScreen;