import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
const store = createStore(applyMiddleware(thunk))


import firebase from './firebase'

import LoginScreen from "./Screens/Auth/login"
import SignupScreen from "./Screens/Auth/signup"
import profile from './Screens/Pages/profile'



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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    );
    }

    return(
      <Provider store ={store}>
          <NavigationContainer>
         <Stack.Navigator initialRouteName="profile">
        <Stack.Screen name="profile" component={profile}/>
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )

  }

}

export default App



