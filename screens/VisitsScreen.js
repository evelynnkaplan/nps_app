import React from 'react';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import * as firebase from 'firebase';

class VisitsScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      visitsArray: this.props.navigation.getParam('visitsArray', [])
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Visits',
      headerLeft: <HeaderBackButton onPress={()=>{navigation.navigate('Home')}} backTitleVisible={true} />
    };
  };

  render() {

    const formatVisits = (array) => {
      let formattedVisits = [];
      array.forEach((visit) => {
        let formattedVisit = {};
        visit = visit.split(', ');
        formattedVisit['visitor'] = visit[0];
        formattedVisit['park'] = visit[1];
        formattedVisit['date'] = visit[2]
        formattedVisits.push(formattedVisit);
      });
      formattedVisits = formattedVisits.sort((a, b) => b.date.localeCompare(a.date));
      return formattedVisits;
    }

    const formattedVisits = formatVisits(this.state.visitsArray);

    return (
      <View style={styles.container}>
         <FlatList 
          data={formattedVisits}
          renderItem={({item}) => 
            <TouchableOpacity 
              style={styles.passData}>
              <Text>{item.date}</Text>
              <Text>{item.park}</Text>
              <Text>{item.visitor}</Text>
            </TouchableOpacity>}
          keyExtractor={item => item}
         />
      </View>
    );
  }
}

export default VisitsScreen;

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