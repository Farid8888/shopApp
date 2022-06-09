import { View, Text, StyleSheet, Button, FlatList,ActivityIndicator } from "react-native";
import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import {Ionicons} from '@expo/vector-icons'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import { IoniconsHeaderButton } from "../UI/HeaderButton";
import { removeOrder } from "../store/actions/cart";
import { orderFunction } from "../store/actions/orders";
import { clearOrders } from "../store/actions/cart";
import { Colors } from "../constans/colors";

export default function CartScreen(props) {
  const orders = useSelector((state) => state.cart.orders);
  const [loading,setLoading] = useState(false)
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch()
  const OrdersData = (props) => {
    return (
        <View style={styles.order}>
          <Text >
            {props.quantity} {props.title}
          </Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item 
            IconComponent={Ionicons}
            title='trash'
            iconName="ios-trash-sharp"
            color="red"
            onPress={()=>dispatch(removeOrder(props.title,props.price))}
            iconSize={20}
            />
          </HeaderButtons>
               <Text style={styles.textStyle}>${props.price.toFixed(2)}</Text>
          </View>
        </View>
    );
  };

  const orderToScreen = async()=>{
    setLoading(true)
  try{
    const date =new Date()
   await  dispatch(orderFunction(orders,totalAmount,date))
  }catch(error){
    throw error
  }
  }
  const orderHandler = ()=>{
      orderToScreen().then(()=>{
        setLoading(false)
      })
    dispatch(clearOrders())
  }
  return (
    <View style={styles.orders}>
      <View style={styles.totalAmount}>
        <Text style={{fontSize:20}}>
          Total:<Text style={{color:Colors.primary}}>${Math.round(totalAmount.toFixed(2)*100)/100}</Text>
        </Text>
        {!loading ? <Button title="ORDER NOW" disabled={orders.length===0} color="orange" onPress={orderHandler}/>:
        <ActivityIndicator style={{flex:1,marginRight:-100}} color='red'/>}
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemdata) => {
          return (
            <OrdersData
              title={itemdata.item.title}
              quantity={itemdata.item.quantity}
              price={itemdata.item.totalPrice}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orders: {
    margin: 10,
    elevation: 5,
    alignItems: "center",
    flex:1
  },
  totalAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    elevation: 5,
  },

  order: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    width: 320,
    padding:15,

    backgroundColor: "white",
  },
  textStyle:{
    fontSize:20,
    fontFamily:'OpenSans-Bold',
  }
});
