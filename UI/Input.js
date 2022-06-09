import React,{useState,useEffect,useReducer} from 'react'
import {View,Button,StyleSheet,TextInput,Text,Keyboard} from 'react-native'


export default function Input(props) {
 
   const initialState={
       value:props.initialValue ? props.initialValue : '',
       validation:props.validation,
       touched:false
   }

   const Reducer =(state=initialState,action)=>{
       if(action.type === 'INPUT CHANGE'){
         return{...state,value:action.value,validation:action.validation}
       }
       if(action.type === 'BLUR'){
           return {...state,touched:true}
       }
       return state
   }
   const [inputState,dispatch] = useReducer(Reducer,initialState)
  
    const changeValue=(text)=>{
        
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
    dispatch({type:'INPUT CHANGE',value:text,validation:isValid})
    }
    const {name,changeText} = props
    
 useEffect(()=>{
    changeText(name,inputState.value,inputState.validation)
 },[name,inputState])
 const blurHandler=()=>{
     dispatch({type:'BLUR'})
 }
  return (
    <View style={styles.line}>
      <Text style={styles.text}>{props.label}</Text>
      <TextInput 
      style={styles.input}
      {...props}
      onChangeText={changeValue}
      value={inputState.value}
      onBlur={blurHandler}
      />
      {!inputState.validation && inputState.touched &&<Text style={{color:'red'}}>{props.errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        borderBottomWidth:1,
        borderColor:'black',
        borderStyle:'solid',
        paddingTop:5
    },
    line:{
        marginBottom:20
    },
    text:{
        fontSize:20,
        fontFamily:'OpenSans-Bold'
    }
})

