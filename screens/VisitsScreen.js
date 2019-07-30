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
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Your Visits</Text>
        </View>
         <FlatList 
          data={formattedVisits}
          renderItem={({item}) => 
            <View
              style={styles.visitData}>
              <Text><Text style={styles.label}>Park: </Text>{item.park}</Text>
              <Text><Text style={styles.label}>Visitor: </Text>{item.visitor}</Text>
              <Text><Text style={styles.label}>Date: </Text>{item.date}</Text>
            </View>}
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
  visitData: {
    padding: 20,
    fontSize: 14,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    textAlign: "center"
  },
  label: {
    fontWeight: "bold",
  },
  headerContainer: {
    padding: 30,
  },
  header: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    testAlign: "left",
    fontSize: 20,
  }
});