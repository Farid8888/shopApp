import React,{useState,useReducer,useEffect} from 'react'
import {View,Button,Text,StyleSheet,Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import Input from '../UI/Input'
import { singUp,logIn } from '../store/actions/auth'
import {useDispatch,useSelector} from 'react-redux'


export default function AuthScreen(props) {
    const [switched,setSwitched] = useState(false)
    const [error,setError] = useState(null)
    console.log(error,'rrrrrrrrrrrrrrrrrrrrrrrrrr')
    const dspatch = useDispatch()
    const switchHandler =()=>{
      setSwitched(prevSt=>!prevSt)
    }

    const initialState ={
        inputValues:{
            userName:'',
            password:'',
        },
        inputValidities:{
            userName:true,
            password:true,
        },
       formIsValid:true
    }

const Reducer =(state=initialState,action)=>{
    if(action.type === 'UPDATE INPUT'){
        const newInputVal = {
            ...state.inputValues,
            [action.nameValue]:action.inputValue
        }
        const newValidities ={
            ...state.inputValidities,
            [action.nameValue]:action.validation
        }
        let newFormVal = true
        for(const key in newValidities){
          newFormVal =newFormVal && newValidities[key]
        }
        return{...state,
           inputValues:newInputVal,
           inputValidities:newValidities,
           formIsValid:newFormVal
        }
     
    }
    return state
 }

    const [state,dispatch] = useReducer(Reducer,initialState)
    const {userName,password} = state.inputValues

const submit =async ()=>{
    if(!state.formIsValid){
        Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
            { text: 'Ok' }
        ]);
        return;
    }
    if(switched){
        try{
            setError(null)
          await dspatch(singUp(userName,password))
        }catch(error){
           setError(error.message)
        }
    }else{
         try{
             setError(null)
          await dspatch(logIn(userName,password))
         }catch(error){
         setError(error.message)
         }
        
    }
}

useEffect(()=>{
    if(error === 'This email already exists'){
        Alert.alert(error,'Please enter a new email',[
            {text:'Ok'}
        ])
    }else if(error === 'Wrong password'){
        Alert.alert(error,'Please enter your password',[
            {text:'Ok'}
        ])
    }else if(error === 'Email does not exist'){
        Alert.alert(error,'Please enter your email',[
            {text:'Ok'}
        ])
    }
},[error])


    
    const inputHandler =(nameValue,inputValue,validation)=>{
        dispatch(
            {type:'UPDATE INPUT',
            nameValue:nameValue,
            inputValue:inputValue,
             validation:validation})
    }

  return (
    <View style={styles.auth}>
        <LinearGradient
        colors={['#ffedff', '#ffe3ff']}
        style={styles.background}
      />
      <View style={styles.input}>
       <Input
        label='Username'
        returnKeyType='next'
        name='userName'
        changeText ={inputHandler}
        keyboardType='default'
        initialValue={''}
        errorText = 'Please enter valid userName'
        validation = {!!state.inputValues.userName}
        required
        email
        />
        </View>
        <View style={styles.input}>
        <Input
        label='Password'
        returnKeyType='next'
        name='password'
        changeText ={inputHandler}
        keyboardType='default'
        initialValue={''}
        errorText = 'Please enter 6 character password'
        validation = {!!state.inputValues.password}
        required
        secureTextEntry
        minLength={6}
        />
        </View>
       <View style={styles.logBtn}>
       <Button  title={!switched ? 'LOG IN' : 'SIGN UP'} onPress={submit}/> 
       </View>
       <View style={styles.switchBtn}>
       <Button color={'red'}  title={!switched ? 'SWITCH TO SIGN UP' : 'SWITCH TO LOG IN'} onPress={switchHandler}/>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    auth:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    switchBtn:{
        width:300,
        marginTop:10,

    },
    logBtn:{
        width:300,
        marginTop:10
    },
    input:{
       
        width:300,
        marginVertical:10
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 800,
      },

})
