import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";
import * as firebase from 'firebase';
import firebaseConfigKeys from './config';

const firebaseConfig = {
  apiKey: firebaseConfigKeys.apiKey,
  authDomain: firebaseConfigKeys.authDomain,
  databaseURL: firebaseConfigKeys.databaseURL,
  projectId: firebaseConfigKeys.projectId,
  storageBucket: firebaseConfigKeys.storageBucket,
  messagingSenderId: firebaseConfigKeys.messagingSenderId,
  appId: firebaseConfigKeys.appId
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  SignUp = (email, password) => {
    try {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => { 
                 console.log(user);
           });
    } catch (error) {
        console.log(error.toString(error));
      }
    };

  Login = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.email);
    }); 
    } catch (error) {
      console.log(error.toString(error));
        }
    };

  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCapitalize="none" 
              autoCorrect={false}
              onChangeText={email => this.setState({ email })} 
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button full rounded success
          onPress={() => this.Login(this.state.email, this.state.password)}>
            <Text>Login</Text>
          </Button>
          <Button full rounded success 
            style={{ marginTop: 20 }}
            onPress={() => this.SignUp(this.state.email, this.state.password)} > 
            <Text>Signup</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
}); 