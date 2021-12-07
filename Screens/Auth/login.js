import React,{ Component } from 'react';
 import { View, Text,  Button, TextInput, StyleSheet } from "react-native"; 
 import * as firebase from "firebase"
import users from '../Pages/users';
import { USER_STATE_CHANGE } from '../../Redux/Constants';
import { connect } from 'react-redux';
 class login extends Component {
     constructor(props){
         super(props);
         this.state={
             email:'',
             password:''
         }
         this.onSingnIn = this.onSignIn.bind(this)
     }
     onSignIn(){
         const {email,password} = this.state;
firebase.auth().signInWithEmailAndPassword(email,password)
.then((result) =>{
    console.log(result)
   
})
.catch((error) =>{
    console.log(error)
})
     }

     onSignUp(){
        this.props.navigation.navigate('signup')
     }
     render(){
     return (
        <View>
      <Text style={{textAlign:"center", fontSize:25}}>login Screen</Text>
      <TextInput
        style={styles.txtinput}
        placeholder="Email"
        autoCapitalize="none"
        // value={email}
       
        onChangeText={(email) => this.setState({email})}
      />

      <TextInput
      style={styles.txtinput}
        placeholder="Password"
        autoCapitalize="none"
        // value={pass}
     
        onChangeText={(password) => this.setState({password})}
      />
      <Button
       
        onPress={() => this.onSignIn()}
        title="login "
      />

        <Button
       
       onPress={() => this.onSignUp()}
       title="Create An Account "
     />
      </View>
     )}
 }
 
const styles =  StyleSheet.create({
    txtinput:{
        fontSize:18,
        marginTop: 20,
        marginLeft: 12,
    }
})

export default login

