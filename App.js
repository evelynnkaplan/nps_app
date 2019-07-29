import * as firebase from 'firebase';
import firebaseConfigKeys from './config';
import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';
import SignOutScreen from './screens/SignOutScreen';
import HomeScreen from './screens/HomeScreen';
import PassScreen from './screens/PassScreen';
import PassLoadingScreen from './screens/PassLoadingScreen';
import VisitsScreen from './screens/VisitsScreen';

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

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Pass: PassScreen,
    PassLoading: PassLoadingScreen,
    Visits: VisitsScreen
  });

const AuthStack = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  SignIn: SignInScreen,
});

export default createAppContainer(createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
  SignOut: SignOutScreen,
  },
  { initialRouteName: 'Auth',}
  ));