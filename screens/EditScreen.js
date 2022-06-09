import React,{useReducer,useState,useEffect,useCallback,useLayoutEffect} from 'react'
import {View,Button,Text,StyleSheet,TextInput,Keyboard,Alert} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import { updateProducts,createProducts } from '../store/actions/products'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import { IoniconsHeaderButton } from '../UI/HeaderButton'
import {Feather} from '@expo/vector-icons'
import Input from '../UI/Input'

export default function EditScreen(props) {
    const dtch = useDispatch()
    const ID =!props.route.params.productId ? '' : props.route.params.productId
    const editedProducts =ID ? useSelector(state=>state.products.usersProducts.find(product=>{
        return product.id === ID
    })) : {}


    const initialState ={
        inputValues:{
            title:editedProducts ? editedProducts.title :'',
            imageUrl:editedProducts ? editedProducts.imageUrl :'',
            description:editedProducts ? editedProducts.description :'',
            id:editedProducts ? editedProducts.id :'',
            price:''
        },
        inputValidities:{
            title:editedProducts ? true : false,
            imageUrl:editedProducts ? true : false,
            description:editedProducts ? true : false,
            price:editedProducts ? true : false
        },
       formIsValid:ID ? true : false
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
    const {title,imageUrl,description,price} = state.inputValues
    console.log(state.inputValues)
const submit =useCallback(()=>{
    if(!state.formIsValid){
        Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
            { text: 'Ok' }
        ]);
        return;
    }
    if(ID){
        dtch(updateProducts(state.inputValues.id,title,imageUrl,description))
    }else{
        dtch(createProducts(title,imageUrl,price,description))
    }
    props.navigation.goBack()
},[title,imageUrl,description,dtch])


    useEffect(()=>{
     props.navigation.setOptions({headerRight:()=>{
        return(
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item 
               IconComponent={Feather}
               style={{marginRight:-15}}
               title="check"
               iconName="check"
               color="white"
               onPress={() => submit()}
            />
          </HeaderButtons>
        )
      }})
    },[submit])
    const inputHandler =(nameValue,inputValue,validation)=>{
        dispatch(
            {type:'UPDATE INPUT',
            nameValue:nameValue,
            inputValue:inputValue,
             validation:validation})
    }

  return (
    <View  style={{margin:20}}>
        <Input
        label='Title'
        returnKeyType='next'
        name='title'
        changeText ={inputHandler}
        keyboardType='default'
        initialValue={editedProducts.title}
        errorText = 'Please enter the title'
        validation = {!!state.inputValues.title}
        required
        />
        <Input
        label='ImageUrl'
        returnKeyType='next'
        name='imageUrl'
        changeText ={inputHandler}
        keyboardType='default'
        initialValue={editedProducts.imageUrl}
        errorText = 'Please enter the Image'
        validation = {!!state.inputValues.imageUrl}
        required
        />
        {!ID && <Input
        label='Price'
        returnKeyType='next'
        name='price'
        changeText ={inputHandler}
        keyboardType='decimal-pad'
        errorText = 'Please enter the price'
        validation = {!!state.inputValues.price}
        required
        min={0.1}
        />}
        <Input
        label='Description'
        returnKeyType='next'
        name='description'
        changeText ={inputHandler}
        keyboardType='default'
        initialValue={editedProducts.description}
        errorText = 'Please enter the description'
        validation = {!!state.inputValues.description}
        required
        numberOfLines={3}
        multiline
        minLength={5}
        />
        {/* <View style={styles.line}>
        <Text style={styles.text}>Title</Text>
       <TextInput value={state.title} style={styles.input} returnKeyType='next' onChangeText={(text)=>dispatch({type:'TITLE',title:text})} onBlur={()=>onBlur(true)}/>
       {!state.titleValid && blur &&<Text style={{color:'red'}}>Please enter title</Text>}
       </View>
       <View style={styles.line}>
       <Text style={styles.text}>Image Url</Text>
       <TextInput value={state.imageUrl} style={styles.input} onChangeText={(text)=>dispatch({type:'IMAGE',image:text})}/>
       </View>
       {!ID && <View style={styles.line}>
       <Text style={styles.text}>Price</Text>
       <TextInput value={state.price} style={styles.input}  keyboardType='numeric' onChangeText={(text)=>dispatch({type:'PRICE',price:text.replace(/[^0-9]/g, '')})} maxLength={10}/>
       </View>}
       <View style={styles.line}>
       <Text style={styles.text}>Description</Text>
       <TextInput value={state.description} style={styles.input} onChangeText={(text)=>dispatch({type:'DESCRIPTION',description:text})}/>
       </View>  */}
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
