import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { deleteProducts } from "../store/actions/products";
import ProductsItem from "../components/ProductsItem";
import { Colors } from "../constans/colors";



export default function AdminScreen(props) {
    const dispatch = useDispatch()
  const products = useSelector((state) => state.products.usersProducts);
  const id = useSelector((state)=>state.auth.userId)
  let userId
  if(id){
   userId =id
  }else{
    userId = useSelector(state=>state.auth.fetchedUserId)
  }
  const filteredProducts = products.filter(product=>product.ownerId === userId)
  console.log(filteredProducts,'ffffffff')
  const editHandler = (id)=>{
   props.navigation.navigate('Edit Product',{productId:id})
  }

  if(filteredProducts.length === 0){
    return(
        <View style={styles.centered}>
            <Text>No products added</Text>

        </View>
    )
}
console.log(products)
  return (
    <View style={styles.products}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <ProductsItem
              title={itemData.item.title}
              description={itemData.item.description}
              imageUrl={itemData.item.imageUrl}
              price={itemData.item.price}
              detailsHandler={() => editHandler(itemData.item.id)}
            >
              <Button title="Edit" color={Colors.primary} onPress={()=>editHandler(itemData.item.id)}/>
              <Button title="Delete" color={Colors.primary} onPress={()=>dispatch(deleteProducts(itemData.item.id))}/>
            </ProductsItem>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  products: {
    flex: 1,
  },
  centered:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
