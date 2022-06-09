import { CartItem } from "../../models/cart-item"


const initialState ={
    orders:[],
    totalAmount:0
}


export const CartReducer = (state = initialState,action)=>{
switch(action.type){
    case('ADD_ORDER'):
    const index = state.orders.findIndex(val=>val.title === action.title)
    let totalAt
    let newOrd
    console.log(index)
    if(index<0){
   
      const  quant =  1
      totalAt = +state.totalAmount + (+action.price)
        newOrd = state.orders.concat(new CartItem(action.title,+action.price,Math.random(),quant))
        
    }else{
        const q = state.orders[index].quantity + 1
        const totalPrice = +state.orders[index].totalPrice + (+action.price)
        totalAt = +state.totalAmount + (+action.price)
        newOrd = [...state.orders]
        const newObj = {...state.orders[index],quantity:q,totalPrice:totalPrice}
        newOrd[index] = newObj
    }
    return {orders:newOrd,totalAmount:totalAt}
    case('REMOVE_ORDER'):
    const ind = state.orders.findIndex(val=>val.title === action.title)
    let totalAmount
    let newOrders
    if(state.orders[ind].quantity === 1){
       totalAmount = +state.totalAmount - (+action.price)
       newOrders = state.orders.filter(order=>order.title !== action.title)
    }else{
        const q = state.orders[ind].quantity - 1
        const priceOneItem = +action.price/state.orders[ind].quantity
        const totalPrice = +state.orders[ind].totalPrice - priceOneItem
        totalAmount = +state.totalAmount - priceOneItem
         newOrders = [...state.orders]
        const newObj = {...state.orders[ind],quantity:q,totalPrice:+totalPrice}
        newOrders[ind] = newObj
    }
    return{orders:newOrders,totalAmount:totalAmount}

    case('CLEAR'):return initialState

    default:return state
}

}


