import React,{useState,useEffect,useCallback} from 'react'
import {View,Text,Button,StyleSheet,FlatList,RefreshControl,ScrollView,ActivityIndicator} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import { Colors } from '../constans/colors'
import { fetchOrders } from '../store/actions/orders'


export default function OrdersScreen() {
    const [refresh,setRefresh] = useState(false)
    const [err,setErr] = useState(null)
    const [loading,setLoading] = useState(false)

    const orders = useSelector(state=>state.orders.orders)
    const dispatch = useDispatch()
   useEffect( async()=>{
       setLoading(true)
       setErr(null)
       try{
       await dispatch(fetchOrders())
      setLoading(false)
       }catch(error){
        setLoading(false)
         setErr(error.message)
       }
       },[dispatch,refresh])
       const onRefresh = () => {
        setRefresh(true);
        dispatch(fetchOrders())
        .then(() => setRefresh(false)).catch(error=>setErr(error.message));
      }
  if(!loading  && orders.length === 0){
      return <View style={styles.centered}><Text>No Orders added</Text></View>
  }
  if(loading){
      return (
          <View>
              <ActivityIndicator style={{marginTop:'70%'}} color='red' size={50}/>
          </View>
      )
  }
  if(err){
    return (
    <View style={styles.centered}>
    <ScrollView  refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}>
        <View>
        <Text>{err}</Text>
        </View>
        </ScrollView>
        </View>
    )
}

    const Orders =(props)=>{
        const [show,setShow] = useState(false)
        const showHandler =()=>{
           setShow(prevSt=>!prevSt)
        }
        
        return(
            <View style={styles.orders}>
               <View style={styles.totalAmount}>
                   <Text style={{fontFamily:'OpenSans-Bold',fontSize:17}}>${props.totalAmount}</Text>
                   <Text style={{color:'grey', fontSize:17}}>{props.date}</Text>
               </View>
               <View style={styles.btn}>
               <Button title={show ? 'HIDE DETAILS' : 'SHOW DETAILS'} onPress={showHandler} color={Colors.primary}/>
               </View>
              
               {show && <View>
                   {props.items.map((item)=>{
                       return (
                       <View style={styles.items} key={item.id}>
                          <Text>{item.quantity} {item.title}</Text>
                          <Text>${item.totalPrice.toFixed(2)}</Text>
                       </View>
                       )
                   })}
               </View>}
            </View>
        )
    }
  return (
    <View style={styles.main}>
     <FlatList data={orders} refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}  keyExtractor={item=>item.id} renderItem={(itemdata)=>{
         return <Orders totalAmount={itemdata.item.totalAmount} date={itemdata.item.date} id={itemdata.item.id} items={itemdata.item.items}/>
     }}/>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
     alignItems:'center',
     flex:1
    },
   centered:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:300
   },
 orders:{
   width:330,
   elevation:5,
   backgroundColor:'white',
   borderRadius:10,
   padding:10,
   marginVertical:10,
   marginHorizontal:30,
   alignItems:'center',
 },
 btn:{
  width:'45%',
  marginVertical:10
 },   
totalAmount:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    padding:5
},
items:{
    flexDirection:'row',
    justifyContent:'space-between',
   width:250,
   marginVertical:5
}
})
