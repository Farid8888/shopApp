import {View,Text,Button,StyleSheet,ScrollView,Image} from 'react-native'
import PRODUCTS from '../data/dummy-data'
import { Colors } from '../constans/colors'
import { StackActions } from '@react-navigation/native'
import {useDispatch,useSelector} from 'react-redux'
import { addOrder } from '../store/actions/cart'

const ProductsDetails =(props)=>{
   const dispatch = useDispatch()
   const products = useSelector(state=>state.products.availabaleProducts)
   console.log(products,'details')
   const filteredProducts = products.filter(product=>product.id === props.route.params.productId)


    return(
        <ScrollView>
            {filteredProducts.map(item=>{
                return(
                    <View key={item.id}>
                          <Image style={styles.image} source={{ uri: item.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={()=>dispatch(addOrder(item.title,item.price))}/>
            </View>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.description}>{item.description}</Text> 
                    </View>
                )
            })}

        </ScrollView>
    )
}

const styles=StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
})


export default ProductsDetails