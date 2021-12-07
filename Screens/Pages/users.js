import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Button} from 'react-native'
import firebase from 'firebase'

import {fetchUsers} from '../../Redux/Actions'

export default function users(props) {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetchUsers();
       
        
    }, [])

    const fetchUsers = (data) => {
        firebase.firestore()
          .collection('users')
          .get()
          .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
              const data = doc.data();
              console.log('shadb', doc.data)
              const id = doc.id;
              return { id, ...data }
            });
    
            setUsers(users);
          })
      }
    
    return (
        <SafeAreaView>
        <Text style={{textAlign:"center"}}>ALL USERS</Text>
        <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text> {item.name}</Text>
          
        )}
      />

      <Button
        title="SignOut"
        onPress={()=>firebase.auth().signOut()}
      />
      
      </SafeAreaView>
        
    )
}
