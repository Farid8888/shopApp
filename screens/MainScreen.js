import React,{useEffect,useState} from 'react'
import {View,Text,ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import AuthNavigator from '../navigations/AuthNavigator'
import ShopNavigator from '../navigations/ShopNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken,logOut,setLogOutTimer } from '../store/actions/auth'


export default function MainScreen() {
    const [loading,setLoading] = useState(true)
    const dispatch =useDispatch()
    const token = useSelector(state=>state.auth.token)
    const fetchedToken = useSelector(state=>state.auth.fetchedToken)
    const expiresIn = useSelector(state=>state.auth.expiresIn)
    const expire =useSelector(state=>state.auth.expire)

    const expireTime = new Date(expiresIn).getTime()
    const ex = parseInt(expire)
    const eTime = new Date(ex).getTime()
    const expTime = eTime - new Date().getTime()
    const expirationTime = expireTime - new Date().getTime()
   console.log(expirationTime,expireTime,expiresIn)
  // console.log(token,fetchedToken)
    useEffect(async()=>{
      if(!token){
        try{
          await dispatch(getToken())
        }catch(e){
            throw e
        }
      }
           
                setLoading(false)
           return ()=>{
             if(expiresIn){
             dispatch(setLogOutTimer(expirationTime))
             }else{
               dispatch(setLogOutTimer(expTime))
             }
           }
    },[dispatch,fetchedToken,token])

    if(loading){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator color={'green'} size={30}/>
            </View>
        )
    }
  return (
    <View style={{flex:1}}>
      {token || fetchedToken && !loading ? <ShopNavigator/> :
      <AuthNavigator/>}
    </View>
  )
}
