import React from "react";
import { View,  Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import {useSelector} from 'react-redux'




const ProductsItem = (props) => {
const ord = useSelector(state=>state.cart.orders)
console.log(ord)

  return (
    <View style={styles.product}>
      <TouchableOpacity style={styles.touch} activeOpacity={0.8} onPress={props.detailsHandler}>
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.imageUrl }} style={styles.img} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price}</Text>
          <View style={styles.buttons}>
             {props.children}
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    overflow:'visible'
  },
  touch:{
   height:350,
   width:'100%',
   overflow:'hidden'
  },
  product: {
    alignItems: "center",
    height: 350,
    margin: 20,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },

  box: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 23,
    fontFamily: "OpenSans-Bold",
  },
  buttons:{
    flexDirection:"row",
    justifyContent:'space-between',
    width:300
  },
  price: {
    fontSize: 15,
    marginVertical: 5,
    fontFamily: "OpenSans-Regular",
  },
  details: {
    marginVertical: 10,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
});

export default ProductsItem;
