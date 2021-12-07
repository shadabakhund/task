import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, applyMiddleaware} from 'redux'
import thunk from 'redux-thunk'


import firebase from './firebase'

import LoginScreen from "./Screens/Auth/login"
import SignupScreen from "./Screens/Auth/signup"
import profile from './Screens/Pages/profile'
import Main from './Screens/Main';
import users from './Screens/Pages/users';


import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from "redux-persist";
import allReducers from './Redux/Reducers/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer, {}, applyMiddleaware);
const persistor = persistStore(store);


const Stack = createStackNavigator();
export class App extends Component {

  constructor(props){
    super(props)
    this.state ={
      loaded:false
    }
  }
  componentDidMount(){
   
    firebase.auth().onAuthStateChanged((user) =>{
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true
        })

      }else{
        this.setState({
          loggedIn:true,
          loaded:true
        })
      }
    })
  }
  render(){
    const {loggedIn,loaded} =this.state;
    if(!loaded){
      return(
        <View style={{flex:1, justifyContent:'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
     
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    );
    }

    return(
      <Provider store ={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
         <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="users" component={users}/>
        <Stack.Screen name="profile" component={profile}/>
        </Stack.Navigator>
        </NavigationContainer>
        </PersistGate>
      </Provider>
    )

  }

}

export default App



