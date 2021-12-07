import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import users from './Pages/users';
import profile from './Pages/profile';

const Tab = createMaterialBottomTabNavigator();
    
export default function Main() {
      return (
        <Tab.Navigator initialRouteName={users}>
          <Tab.Screen name="users" component={users}
            options={{
                tabBarIcon:()=>(
                    <MaterialCommunityIcons
                        name="home"
                        color="white"
                        size={26}
                    />),}}/>
          
          
          <Tab.Screen name="profile" component={profile} 
           options={{ 
            tabBarIcon:()=>(
                <MaterialCommunityIcons
                    name="account"
                    color="white"
                    size={26}
                />),}}/>

        </Tab.Navigator>
      );
    }