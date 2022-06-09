import React from 'react'
import AuthScreen from '../screens/AuthScreen' 
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import { Colors } from '../constans/colors'
import {View,Text} from 'react-native'


export default function AuthNavigator() {
    const Auth = createNativeStackNavigator()
    const HeaderText =()=>{
        return (
         <View style={{marginLeft:40}}>
             <Text style={{color:'white',fontSize:23,fontWeight:'bold'}}>Auth</Text>
         </View>
        )
    }
  return (
    <NavigationContainer>
      <Auth.Navigator screenOptions={{headerStyle:{backgroundColor:Colors.primary},headerTitleStyle:{color:'white'}}}>
          <Auth.Screen name='Auth' component={AuthScreen} options={{headerTitle:(props)=><HeaderText {...props}/>,orientation:'all'}}/>
      </Auth.Navigator>
    </NavigationContainer>
  )
}
