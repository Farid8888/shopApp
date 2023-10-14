import React,{useEffect,useState,useCallback} from 'react'
import {View,Button,Text,StyleSheet,FlatList,ActivityIndicator,RefreshControl} from 'react-native'
import PRODUCTS from '../data/dummy-data'
import ProductsItem from '../components/ProductsItem'
import {DrawerActions} from '@react-navigation/native'
import {useDispatch,useSelector} from 'react-redux'
import { setProducts } from '../store/actions/products'
import { Colors } from '../constans/colors'
import { addOrder } from '../store/actions/cart' 

const ProductOverview =(props)=>{
const [loading,setLoading] = useState(false)
const [refresh,setRefresh] = useState(false)
const [error,setError] = useState(false)    

const dispatch = useDispatch()
const products = useSelector(state=>state.products.availabaleProducts)

const loadProducts = useCallback(async()=>{
    setError(null)
    setRefresh(true)
    try{
        await dispatch(setProducts())
    }catch(error){
       setError(error.message)
    }
    setRefresh(false)
},[setError,setLoading,dispatch])


useEffect(() => {
    setLoading(true)
    const willFocusSub = props.navigation.addListener('focus', loadProducts);
    willFocusSub
}, [loadProducts]);

useEffect(()=>{
   loadProducts().then(()=>{
       setLoading(false)
   })
 
},[dispatch,loadProducts])

    
    const detailsHandler = (ID)=>{
        props.navigation.push('Details',{productId:ID})
    }

    
    if(loading ){
        return(
            <View>
            <ActivityIndicator style={{marginTop:'70%'}} color='red' size={50}/>
          </View>
        )  
    }
    if(!loading && products.length === 0 ){
        return(
            <View style={styles.centered}>
                <Text>No products added</Text>
            </View>
        )
    }
    
 if(error){
     return(
         <View style={styles.centered}>
             <Text>{error}</Text>
             <Button title='TRY AGAIN' onPress={loadProducts}/>
         </View>
     )
 }

    return(
        <View style={styles.products}>
           <FlatList data={products}   refreshControl={<RefreshControl onRefresh={loadProducts} refreshing={refresh}/>} keyExtractor={item=>item.id} renderItem={(itemData)=>{
               return (
               <ProductsItem title={itemData.item.title} description={itemData.item.description} imageUrl={itemData.item.imageUrl} price={itemData.item.price} detailsHandler={()=>detailsHandler(itemData.item.id)}>
                    <Button title="View Details" color={Colors.primary} onPress={()=>detailsHandler(itemData.item.id)} />
              <Button title="TO CART" color={Colors.primary} onPress={()=>dispatch(addOrder(itemData.item.title,itemData.item.price))}/>
                 </ProductsItem>  
               )
           }}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
 products:{
  flex:1,
 },
 centered: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
}
})


export default ProductOverview