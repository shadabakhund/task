import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Button} from 'react-native'
import firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler'
import { onChange } from 'react-native-reanimated'


function profile(props) {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [editButton,setEditButton]=useState(false)
    
    useEffect(()=>{
        getUserInfo()
    }, [])

    const getUserInfo=()=>{
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(result =>{
                setName(result.data().name)
                setEmail(result.data().email)
        })
    }

    const onNameChange=(name)=>{
        setName(name)
        console.log(name);
    }

    const onEmailChange=(email)=>{
        setEmail(email)
        console.log(email);
    }

    const updateUserInfo = () =>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            name: name,
            email: email
        })
        setEditButton(false)
    }

    return (
        <SafeAreaView>
            {editButton?
            <View>
            <TextInput value={name} onChangeText={(name)=>onNameChange(name)}/>
            <TextInput value={email} onChangeText={(email)=>onEmailChange(email)} />
            <Button title="update" onPress={()=>updateUserInfo()} />
            </View>:
        <View>
        <Text>Current Username: {name}</Text>
        <Text>Current UserEmail: {email}</Text>
        </View>}
        
        <Button
            title="Edit"
            onPress={()=>setEditButton(true)}
        />

        
      <Button
        title="SignOut"
        onPress={()=>firebase.auth().signOut()}
      />
    
      
      </SafeAreaView>
        
    )
}

  export default profile;